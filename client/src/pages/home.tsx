import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, ExternalLink, AlertTriangle } from "lucide-react";

type AppState = {
  isLoading: boolean;
  hasError: boolean;
  connectionStatus: 'connected' | 'error' | 'loading';
  iframeLoaded: boolean;
};

export default function HomePage() {
  const [appState, setAppState] = useState<AppState>({
    isLoading: true,
    hasError: false,
    connectionStatus: 'loading',
    iframeLoaded: false
  });

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const IFRAME_URL = "https://v2.numerologia-cotidiana.com/?m=1";

  useEffect(() => {
    // Set up iframe load timeout
    timeoutRef.current = setTimeout(() => {
      if (appState.isLoading && !appState.iframeLoaded) {
        handleIframeError();
      }
    }, 15000); // 15 second timeout

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [appState.isLoading, appState.iframeLoaded]);

  const handleIframeLoad = () => {
    setAppState(prev => ({
      ...prev,
      isLoading: false,
      hasError: false,
      iframeLoaded: true,
      connectionStatus: 'connected'
    }));
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleIframeError = () => {
    setAppState(prev => ({
      ...prev,
      isLoading: false,
      hasError: true,
      iframeLoaded: false,
      connectionStatus: 'error'
    }));
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const retryConnection = () => {
    setAppState(prev => ({
      ...prev,
      isLoading: true,
      hasError: false,
      connectionStatus: 'loading'
    }));
    
    // Force iframe reload
    if (iframeRef.current) {
      iframeRef.current.src = IFRAME_URL;
    }
  };

  const openInBrowser = () => {
    window.open(IFRAME_URL, '_blank');
  };

  const getStatusIndicator = () => {
    switch (appState.connectionStatus) {
      case 'connected':
        return {
          color: 'bg-green-500',
          text: 'Conectado',
          animation: 'animate-pulse'
        };
      case 'error':
        return {
          color: 'bg-red-500',
          text: 'Error',
          animation: 'animate-bounce'
        };
      case 'loading':
        return {
          color: 'bg-yellow-500',
          text: 'Cargando...',
          animation: 'animate-spin'
        };
      default:
        return {
          color: 'bg-gray-500',
          text: 'Desconectado',
          animation: ''
        };
    }
  };

  const statusConfig = getStatusIndicator();

  return (
    <div className="h-screen bg-background">
      {/* Main Content */}
      <main className="h-full relative">
        {/* Loading State */}
        {appState.isLoading && (
          <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
            <div className="text-center">
              <div className="loading-spinner mx-auto mb-4"></div>
              <p className="text-secondary font-medium">Cargando Numerología Cotidiana...</p>
              <p className="text-sm text-gray-400 mt-2">Conectando con el universo numérico</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {appState.hasError && (
          <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
            <Card className="w-full max-w-md mx-4">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="error-icon mx-auto mb-4">
                    <AlertTriangle className="text-red-500 h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2">Error de Conexión</h3>
                  <p className="text-secondary mb-6">
                    No se pudo cargar el contenido. Esto puede deberse a restricciones de iframe o problemas de conexión.
                  </p>
                  <div className="space-y-3">
                    <Button
                      onClick={retryConnection}
                      className="retry-btn"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Intentar Nuevamente
                    </Button>
                    <Button
                      onClick={openInBrowser}
                      variant="outline"
                      className="browser-btn"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Abrir en Navegador
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Iframe */}
        <div className="w-full h-full">
          <iframe
            ref={iframeRef}
            src={IFRAME_URL}
            className="w-full h-full border-0"
            title="Numerología Cotidiana Application"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-navigation"
          />
        </div>

        {/* Connection Status Indicator */}
        <div className="status-indicator">
          <div className={`w-2 h-2 rounded-full ${statusConfig.color} ${statusConfig.animation}`}></div>
          <span className="text-xs text-secondary font-medium">{statusConfig.text}</span>
        </div>
      </main>
    </div>
  );
}
