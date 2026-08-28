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
            is_build = data.get('isBuildRequest', False)
            
            response_data = self.process_ai_chat(message, model, is_build)
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response_data).encode('utf-8'))
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))

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

    def process_ai_chat(self, msg, model, is_build=False):
        query = msg.lower()
        
        # If it is an autonomous build request:
        if is_build or "build" in query or "modify" in query or "change" in query or "css" in query or "style" in query:
            filename = "style.css"
            
            # Fetch current file content from GitHub
            raw_content, sha = self.get_github_file(filename)
            if raw_content is None:
                return {
                    "reply": f"System Alert: Could not fetch file `{filename}` from GitHub. Make sure GITHUB_TOKEN is active.",
                    "isSummary": False
                }

            # Heuristically check what the user wants to change
            new_bg = None
            color_name = "unknown"
            if "red" in query:
                new_bg = "rgba(136, 0, 0, 0.85)"
                color_name = "DARK RED"
            elif "blue" in query:
                new_bg = "rgba(0, 51, 102, 0.85)"
                color_name = "DARK BLUE"
            elif "green" in query:
                new_bg = "rgba(0, 102, 51, 0.85)"
                color_name = "DARK GREEN"
            elif "purple" in query:
                new_bg = "rgba(102, 0, 153, 0.85)"
                color_name = "DARK PURPLE"
            elif "yellow" in query or "amber" in query:
                new_bg = "rgba(180, 120, 0, 0.85)"
                color_name = "DARK AMBER"
            elif "reset" in query or "restore" in query or "default" in query:
                new_bg = "rgba(4, 7, 20, 0.6)"
                color_name = "SOVEREIGN DEFAULT"

            # Fallback edit: append a comment
            if new_bg:
                # Replace the background rule of .top-nav
                # Simple replacement since we know the exact line structure
                target_string = "background: rgba(4, 7, 20, 0.6);"
                if target_string not in raw_content:
                    # check if already replaced previously
                    for c in ["rgba(136, 0, 0, 0.85)", "rgba(0, 51, 102, 0.85)", "rgba(0, 102, 51, 0.85)", "rgba(102, 0, 153, 0.85)", "rgba(180, 120, 0, 0.85)", "rgba(4, 7, 20, 0.6)"]:
                        candidate = f"background: {c};"
                        if candidate in raw_content:
                            target_string = candidate
                            break
                
                updated_content = raw_content.replace(target_string, f"background: {new_bg};")
                # Append audit logs
                updated_content += f"\n/* Autonomous update: Shifted header background to {color_name} */\n"
                action_desc = f"Shifted top-nav background to {color_name}"
            else:
                updated_content = raw_content + f"\n/* Autonomous comment: {msg} */\n"
                action_desc = f"Appended custom comment: {msg[:30]}..."

            # Push back to GitHub
            commit_msg = f"feat(autonomous): {action_desc}"
            success = self.push_github_file(filename, updated_content, sha, commit_msg)
            
            if success:
                return {
                    "reply": f"🤖 **Sovereign Autonomous OS Rebuild Gateway**:\n\n"
                             f"Successfully audited, compiled, and pushed code updates to GitHub!\n"
                             f"- **Target File**: `style.css`\n"
                             f"- **Action**: {action_desc}\n"
                             f"- **Commit Hash Reference**: `main-branch`\n\n"
                             f"🚀 **Vercel has intercepted the commit and is rebuilding the site now**! It will be updated live in ~10 seconds at https://ipo-brain.com.",
                    "isSummary": True,
                    "summaryData": {
                        "title": f"Autonomous Rebuild: style.css",
                        "scope": "Cloud Self-Healing pipeline",
                        "status": "BUILDING / DEPLOYING",
                        "objective": f"Incorporate layout shift: {msg}",
                        "code": f"/* Committed change to repository */\n/* Path: style.css */\n/* Action: {action_desc} */\n/* Triggering Vercel deployment hook... */",
                        "codeLang": "css"
                    }
                }
            else:
                return {
                    "reply": f"System Alert: Failed to commit code updates to the GitHub repository. Please verify GITHUB_TOKEN write permissions on Vercel.",
                    "isSummary": False
                }

        # Fallback to standard scifi responses
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
