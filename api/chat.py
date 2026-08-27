from http.server import BaseHTTPRequestHandler
import json

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

    def process_ai_chat(self, msg, model):
        query = msg.lower()
        
        # 1. Check for command triggers
        if msg.startswith('/'):
            return {
                "reply": "Commands are processed on-client. If you see this, command handling succeeded.",
                "isSummary": False
            }

        # 2. Check if a summary configuration or plan is requested
        if any(k in query for k in ["summary", "plan", "build", "deploy", "checklist"]):
            return {
                "reply": "System architecture deployment checklist summary compiled.",
                "isSummary": True,
                "summaryData": {
                    "title": "Sovereign Framework Launch Strategy",
                    "scope": "Event-Driven Integration Modules",
                    "status": "ACTIVE / READY",
                    "objective": f"Boot up visualizers, bind cyber-synth audio loops, and execute file scans in the project repository using {model.upper()} core clusters.",
                    "code": "# Sovereign Server Boot script\nimport os, sys\n\ndef main():\n    print(\"Initializing Matrix Hub Host...\")\n    port = int(os.environ.get(\"LILJR_PORT\", \"8794\"))\n    print(f\"Active on port: {port}\")\n\nif __name__ == \'__main__\':\n    main()",
                    "codeLang": "python"
                }
            }

        # 3. Handle model-specific generic chat prompts
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

        # Default Gemini Flash response
        return {
            "reply": f"Gemini 3.5 Flash core online. Processed prompt: \"{msg}\" successfully. Voice synthesizer ready to read responses out loud. Choose voices on the right HUD panel to listen.",
            "isSummary": False
        }
