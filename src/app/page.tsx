import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Logo } from '@/components/logo';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm">
        <Logo />
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  A new standard in healthcare management.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  NovaHealth Lite provides a seamless, modern platform for patients, doctors, and administrators to manage healthcare with ease and efficiency.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/login">Patient & Staff Login</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/signup">Create an Account</Link>
                </Button>
              </div>
            </div>
            <Card className="overflow-hidden rounded-2xl shadow-lg">
              <CardContent className="p-0">
                <Image
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden object-cover"
                  data-ai-hint="healthcare professional"
                  height="400"
                  src="https://placehold.co/600x400"
                  width="600"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
