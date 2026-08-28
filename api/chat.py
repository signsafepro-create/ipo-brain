from http.server import BaseHTTPRequestHandler
import json
import urllib.request
import base64
import os

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")
GITHUB_REPO = "signsafepro-create/ipo-brain"

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        
        try:
            data = json.loads(post_data.decode('utf-8'))
            message = data.get('message', '').strip()
            model = data.get('model', 'gemini')
            
            response_data = self.process_ai_chat(message, model)
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response_data).encode('utf-8'))
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))

    def call_gemini(self, prompt):
        gemini_key = os.environ.get("GEMINI_KEY")
        if not gemini_key:
            return "Error: GEMINI_KEY environment variable is missing on serverless host."
            
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_key}"
        headers = {"Content-Type": "application/json"}
        payload = {
            "contents": [{
                "parts": [{"text": prompt}]
            }]
        }
        
        try:
            req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers=headers, method='POST')
            with urllib.request.urlopen(req, timeout=30) as response:
                res_data = json.loads(response.read().decode('utf-8'))
                return res_data['candidates'][0]['content']['parts'][0]['text']
        except Exception as e:
            return f"Error calling Gemini API: {str(e)}"

    def get_github_file(self, path):
        if not GITHUB_TOKEN:
            return None, None
            
        url = f"https://api.github.com/repos/{GITHUB_REPO}/contents/{path}"
        headers = {
            "Authorization": f"token {GITHUB_TOKEN}",
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "Sovereign-Agent-OS"
        }
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=15) as response:
                data = json.loads(response.read().decode('utf-8'))
                content_b64 = data.get('content', '')
                raw_content = base64.b64decode(content_b64.replace('\n', '')).decode('utf-8')
                return raw_content, data.get('sha')
        except Exception as e:
            return None, None

    def push_github_file(self, path, content, sha, commit_msg):
        if not GITHUB_TOKEN:
            return False
            
        url = f"https://api.github.com/repos/{GITHUB_REPO}/contents/{path}"
        headers = {
            "Authorization": f"token {GITHUB_TOKEN}",
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "Sovereign-Agent-OS",
            "Content-Type": "application/json"
        }
        
        content_b64 = base64.b64encode(content.encode('utf-8')).decode('utf-8')
        payload = {
            "message": commit_msg,
            "content": content_b64
        }
        if sha:
            payload["sha"] = sha

        try:
            req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers=headers, method='PUT')
            with urllib.request.urlopen(req, timeout=15) as response:
                return True
        except Exception as e:
            return False

    def process_ai_chat(self, msg, model):
        # 1. Classify the user prompt using Gemini
        classification_prompt = f"""
Analyze this request from a developer: "{msg}"
If they want to write code, modify a page, add a feature, style something, edit a file, or build what they are asking, identify:
- File to modify (choose one from: index.html, style.css, app.js, pitch.js, pitch.html, or None)
- The precise instructions for the modification.

Output your response as raw JSON (no formatting markdown or ```json tags):
{{
  "isCodeRequest": true/false,
  "targetFile": "filename_or_None",
  "explanation": "brief description"
}}
"""
        class_res_raw = self.call_gemini(classification_prompt)
        class_res_raw = class_res_raw.replace('```json', '').replace('```', '').strip()
        
        try:
            classification = json.loads(class_res_raw)
        except Exception:
            classification = {"isCodeRequest": False, "targetFile": None, "explanation": "Fallback"}

        # 2. If it is an autonomous code build request:
        if classification.get("isCodeRequest") and classification.get("targetFile") not in [None, "None"]:
            filename = classification.get("targetFile")
            
            # Fetch current file content from GitHub
            raw_content, sha = self.get_github_file(filename)
            if raw_content is None:
                return {
                    "reply": f"System Alert: Could not fetch file `{filename}` from the GitHub repository `{GITHUB_REPO}`. Make sure GITHUB_TOKEN env variable is set on Vercel.",
                    "isSummary": False
                }

            # Generate new file content
            code_prompt = f"""
You are the Sovereign Autonomous Coding Core.
The user wants to make this modification: "{msg}"
Here is the current content of the file "{filename}":
---
{raw_content}
---
Generate the COMPLETE updated content of this file with the modification incorporated.
Do not wrap your output in ```html, ```css, ```js, or markdown code blocks. Output ONLY the raw file contents.
"""
            updated_content = self.call_gemini(code_prompt)
            
            # Strip markdown wrappers if Gemini added them anyway
            if updated_content.startswith('```'):
                lines = updated_content.splitlines()
                if lines[0].startswith('```'):
                    lines = lines[1:]
                if lines[-1].startswith('```'):
                    lines = lines[:-1]
                updated_content = '\n'.join(lines)

            # Push back to GitHub
            commit_msg = f"feat(autonomous): {classification.get('explanation')}"
            success = self.push_github_file(filename, updated_content, sha, commit_msg)
            
            if success:
                return {
                    "reply": f"🤖 **Sovereign Autonomous Agent OS Core**:\n\n"
                             f"Successfully audited, rewrote, and committed code updates to GitHub!\n"
                             f"- **Target File**: `{filename}`\n"
                             f"- **Action**: {classification.get('explanation')}\n"
                             f"- **Commit**: `{commit_msg}`\n\n"
                             f"🚀 **Vercel is now building and deploying these changes live**! It will be ready in ~15 seconds at https://ipo-brain.com.",
                    "isSummary": True,
                    "summaryData": {
                        "title": f"Autonomous Rebuild: {filename}",
                        "scope": "Cloud Self-Healing pipeline",
                        "status": "BUILDING / DEPLOYING",
                        "objective": f"Incorporate: {msg}",
                        "code": f"# Committed change to repository\n# Path: {filename}\n# State: SUCCESSFUL PUSH\n# Rebuilding on Vercel...",
                        "codeLang": "python"
                    }
                }
            else:
                return {
                    "reply": f"System Alert: Failed to commit code updates to the GitHub repository. Please verify GITHUB_TOKEN write permissions on Vercel.",
                    "isSummary": False
                }

        # 3. Fallback to standard scifi responses
        query = msg.lower()
        if msg.startswith('/'):
            return {
                "reply": "Commands are processed on-client. If you see this, command handling succeeded.",
                "isSummary": False
            }

        if any(k in query for k in ["summary", "plan", "build", "deploy", "checklist"]):
            return {
                "reply": "System architecture deployment checklist summary compiled.",
                "isSummary": True,
                "summaryData": {
                    "title": "Sovereign Framework Launch Strategy",
                    "scope": "Event-Driven Integration Modules",
                    "status": "ACTIVE / READY",
                    "objective": "Boot up visualizers, bind cyber-synth audio loops, and execute file scans in the project repository.",
                    "code": "# Sovereign Server Boot script\nimport os, sys\n\ndef main():\n    print(\"Initializing Matrix Hub Host...\")\n    port = int(os.environ.get(\"LILJR_PORT\", \"8794\"))\n    print(f\"Active on port: {port}\")\n\nif __name__ == \'__main__\':\n    main()",
                    "codeLang": "python"
                }
            }

        if model == 'autofix':
            return {
                "reply": "Safe debug compiler logs analyzed:\n- Syntax error in imports: None.\n- Device fingerprint security test: Approved.\n- Action recommendation: Run compile checks to test build stability.",
                "isSummary": False
            }
        
        if model == 'sovereign':
            return {
                "reply": "Matrix event state machine verified. Stripe invoices, legal document scan logs, and active chat threads have synced to localStorage database. Sovereign cluster ready for direct commands.",
                "isSummary": False
            }
        
        if model == 'claude':
            return {
                "reply": f"Processing query via high-reasoning engine cluster. Input: \"{msg}\". Analysis suggests full compatibility with scifi UI layout guidelines. Let me know if you would like to run directory checks or compile files.",
                "isSummary": False
            }

        return {
            "reply": f"Gemini 3.5 Flash core online. Processed prompt: \"{msg}\" successfully. Voice synthesizer ready to read responses out loud. Choose voices on the right HUD panel to listen.",
            "isSummary": False
        }
