import { useState, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Upload, Image as ImageIcon, Check, Copy, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { validateImageFile } from '@/lib/imageValidation';
import { uploadApologyLetter } from '@/services/apologyLetters';
import { buildShareUrl } from '@/lib/shareUrl';

export default function UploadLetterPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    setError(null);
    setSelectedFile(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const letterId = await uploadApologyLetter(selectedFile, (progress) => {
        setUploadProgress(progress);
      });
      
      const url = buildShareUrl(letterId);
      setShareUrl(url);
      setUploadProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload. Please try again.');
      setIsUploading(false);
    }
  };

  const handleCopyLink = async () => {
    if (!shareUrl) return;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setShareUrl(null);
    setError(null);
    setIsUploading(false);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (shareUrl) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Heart className="w-10 h-10 text-primary fill-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Your Letter is Ready to Share
          </h1>
          <p className="text-muted-foreground text-lg">
            Send this link to share your heartfelt apology
          </p>
        </div>

        <Card className="border-2 shadow-lg">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  onClick={handleCopyLink}
                  variant={copied ? "default" : "outline"}
                  className="shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => navigate({ to: `/view/${shareUrl.split('/').pop()}` })}
                  variant="outline"
                  className="flex-1"
                >
                  Preview Letter
                </Button>
                <Button
                  onClick={handleReset}
                  variant="secondary"
                  className="flex-1"
                >
                  Upload Another
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
      <div className="mb-8 md:mb-12">
        <div className="flex items-center justify-center mb-6">
          <img
            src="/assets/generated/apology-logo.dim_256x256.png"
            alt="Apology Letter"
            className="w-16 h-16 md:w-20 md:h-20"
          />
        </div>
        
        <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl">
          <img
            src="/assets/generated/apology-illustration.dim_1200x400.png"
            alt="Share your heartfelt apology"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Share Your Heartfelt Apology
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Upload a photo of your apology letter and get a shareable link to send to your boyfriend
          </p>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto shadow-xl border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Upload Your Letter</CardTitle>
          <CardDescription>
            Choose a clear photo of your handwritten or printed apology letter
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="letter-upload">Select Image</Label>
            <div className="flex gap-2">
              <Input
                id="letter-upload"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={isUploading}
                className="flex-1"
              />
              {selectedFile && !isUploading && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                >
                  Clear
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Supported formats: JPG, PNG, GIF, WebP (max 10MB)
            </p>
          </div>

          {previewUrl && (
            <div className="space-y-4">
              <div className="border-2 border-border rounded-lg overflow-hidden bg-muted/30">
                <img
                  src={previewUrl}
                  alt="Letter preview"
                  className="w-full h-auto max-h-96 object-contain"
                />
              </div>

              {isUploading ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Uploading...</span>
                    <span className="font-medium">{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              ) : (
                <Button
                  onClick={handleUpload}
                  className="w-full"
                  size="lg"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload & Get Share Link
                </Button>
              )}
            </div>
          )}

          {!selectedFile && (
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center bg-muted/20">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                No image selected. Choose a file to get started.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
