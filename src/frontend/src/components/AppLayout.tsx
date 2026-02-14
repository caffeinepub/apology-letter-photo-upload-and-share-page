import { Outlet } from '@tanstack/react-router';
import { Heart } from 'lucide-react';

export default function AppLayout() {
  const currentYear = new Date().getFullYear();
  
  const getAppIdentifier = () => {
    try {
      return encodeURIComponent(window.location.hostname);
    } catch {
      return 'apology-letter-app';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        <Outlet />
      </main>
      
      <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} · Built with{' '}
            <Heart className="inline-block w-4 h-4 text-rose-500 fill-rose-500 mx-1" />
            {' '}using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${getAppIdentifier()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors underline decoration-dotted underline-offset-4"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
