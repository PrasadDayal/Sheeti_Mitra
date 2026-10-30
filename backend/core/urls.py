"""
URL configuration for sheetimitra_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os
from pathlib import Path
from django.contrib import admin
from django.urls import path, include, re_path
from django.http import JsonResponse, HttpResponse
from django.conf import settings
from django.views.static import serve

def health_check(request):
    return JsonResponse({
        'status': 'ok',
        'service': 'ShetiMitra AI Platform',
        'version': '1.0.0',
        'database': 'connected',
    })

def serve_frontend_app(request):
    """
    Serves the production built React single-page application (SPA).
    If frontend/dist has not been built yet, provides an interactive API Hub with direct links.
    """
    frontend_dist = settings.BASE_DIR.parent / 'frontend' / 'dist'
    index_html = frontend_dist / 'index.html'

    if index_html.exists():
        with open(index_html, 'r', encoding='utf-8') as f:
            return HttpResponse(f.read(), content_type='text/html')

    # Fallback developer dashboard
    return HttpResponse("""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>ShetiMitra AI Backend API</title>
        <style>
            body { font-family: system-ui, -apple-system, sans-serif; background: #0c0a09; color: #f5f5f4; margin: 0; padding: 40px; }
            .card { max-width: 650px; margin: 0 auto; background: #1c1917; border: 1px solid #292524; border-radius: 20px; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
            h1 { color: #34d399; margin-top: 0; }
            .btn { display: inline-block; padding: 12px 24px; border-radius: 12px; font-weight: bold; text-decoration: none; margin-right: 12px; margin-top: 16px; }
            .btn-green { background: #059669; color: white; }
            .btn-stone { background: #292524; color: #d6d3d1; }
            ul { line-height: 1.8; color: #a8a29e; }
            a { color: #34d399; text-decoration: none; }
            a:hover { text-decoration: underline; }
            .badge { background: #064e3b; color: #6ee7b7; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="card">
            <span class="badge">API Server Running</span>
            <h1>🌱 ShetiMitra AI Backend</h1>
            <p>The Django REST Framework backend is running on <strong>http://127.0.0.1:8000</strong>.</p>
            <div style="margin: 24px 0;">
                <a href="http://localhost:5173" class="btn btn-green">🖥️ Open Frontend Web App (Port 5173)</a>
                <a href="http://localhost:5173/register" class="btn btn-stone">📝 Open Registration Page</a>
            </div>
            <h3>Quick API Links:</h3>
            <ul>
                <li><a href="/api/health/">/api/health/</a> - System Health Status</li>
                <li><a href="/api/farmers/">/api/farmers/</a> - Farmer Profiles</li>
                <li><a href="/api/market-prices/">/api/market-prices/</a> - APMC Mandi Rates</li>
                <li><a href="/api/buyers/">/api/buyers/</a> - Verified Exporters & Buyers</li>
                <li><a href="/admin/">/admin/</a> - Django Admin Panel</li>
            </ul>
        </div>
    </body>
    </html>
    """, content_type='text/html')

urlpatterns = [
    # API and Admin Routes
    path('health/', health_check, name='health_check'),
    path('api/health/', health_check, name='api_health_check'),
    path('admin/', admin.site.urls),
    path('api/ai/', include('ai_service.urls')),
    path('api/', include('farm_service.urls')),

    # Static assets for the built React frontend
    re_path(
        r'^assets/(?P<path>.*)$',
        serve,
        {'document_root': settings.BASE_DIR.parent / 'frontend' / 'dist' / 'assets'}
    ),
    re_path(
        r'^(?P<path>favicon\.svg|icons\.svg|_redirects)$',
        serve,
        {'document_root': settings.BASE_DIR.parent / 'frontend' / 'dist'}
    ),

    # Catch-all: serve React frontend SPA (/, /register, /login, /dashboard, etc.)
    re_path(r'^(?!api/|admin/|health/).*$', serve_frontend_app, name='frontend_app'),
]
