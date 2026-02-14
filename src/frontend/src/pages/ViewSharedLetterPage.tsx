import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Heart, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetApologyLetter } from '@/hooks/useQueries';

export default function ViewSharedLetterPage() {
  const { id } = useParams({ from: '/view/$id' });
  const navigate = useNavigate();
  const { data: letter, isLoading, error } = useGetApologyLetter(id);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
        <div className="text-center mb-8">
          <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
          <Skeleton className="h-10 w-64 mx-auto mb-3" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        <Card className="shadow-xl">
          <CardContent className="p-6">
            <Skeleton className="w-full h-96" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !letter) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mb-6">
            <AlertCircle className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Letter Not Found
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            This apology letter doesn't exist or may have been removed.
          </p>
        </div>

        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'Unable to load the apology letter.'}
          </AlertDescription>
        </Alert>

        <div className="text-center">
          <Button
            onClick={() => navigate({ to: '/' })}
            size="lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Create Your Own Letter
          </Button>
        </div>
      </div>
    );
  }

  const imageUrl = letter.blob.getDirectURL();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <Heart className="w-8 h-8 text-primary fill-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
          A Heartfelt Apology
        </h1>
        <p className="text-muted-foreground text-lg">
          Someone cares enough to make things right
        </p>
      </div>

      <Card className="shadow-2xl border-2 overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-muted/30 p-4 md:p-8">
            <img
              src={imageUrl}
              alt="Apology letter"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </CardContent>
      </Card>

      <div className="text-center mt-8">
        <Button
          onClick={() => navigate({ to: '/' })}
          variant="outline"
          size="lg"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Create Your Own Apology Letter
        </Button>
      </div>
    </div>
  );
}
