#!/usr/bin/env python3
"""
Tungi Trails — one-file web server.

Run this file with Python 3 (no installs needed):
    python server.py          (Windows:  py server.py)

It serves the dashboard to every phone/laptop on the SAME WiFi.
It prints the address to open, e.g.  http://192.168.1.5:5000
Press Ctrl+C to stop.
"""
import http.server
import os
import socket
import socketserver
import sys
import webbrowser

FOLDER = os.path.dirname(os.path.abspath(__file__))
PORTS = list(range(5000, 5011))


def lan_ip() -> str:
    """Find this computer's address on the local network."""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))       # no data is sent
        return s.getsockname()[0]
    except OSError:
        return "127.0.0.1"
    finally:
        s.close()


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=FOLDER, **kwargs)

    def end_headers(self):
        # Always serve the newest file (handy while editing CONFIG).
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        sys.stdout.write("  visit: %s — %s\n" % (self.address_string(), fmt % args))


def main() -> None:
    ip = lan_ip()
    for port in PORTS:
        try:
            with socketserver.ThreadingTCPServer(("0.0.0.0", port), Handler) as httpd:
                httpd.allow_reuse_address = True
                url_lan = f"http://{ip}:{port}"
                url_me = f"http://localhost:{port}"
                print()
                print("  ─────────────────────────────────────────────")
                print("   CLUB MAHINDRA RESORTS is running")
                print()
                print(f"   On guest phones (same WiFi):  {url_lan}")
                print(f"   On this computer:             {url_me}")
                print("  ─────────────────────────────────────────────")
                print()
                try:
                    webbrowser.open(url_me)
                except Exception:
                    pass
                httpd.serve_forever()
                return
        except OSError:
            continue  # port busy — try the next one
        except KeyboardInterrupt:
            print("\n  Stopped. Bye!")
            return
    print("Could not find a free port between 5000 and 5010.")


if __name__ == "__main__":
    main()
