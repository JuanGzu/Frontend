import http.server
import socketserver

PORT = 8080
ADDRESS = "" #Tu ip de tailscale aquí

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer((ADDRESS, PORT), Handler) as httpd:
    print(f"Servidor HTTP activo en http://{ADDRESS}:{PORT}")
    httpd.serve_forever()
