// src/app/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation - Responsive padding */}
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-lg sm:text-xl tracking-tight">
            #NotInMyCity
          </div>
          <Button asChild variant="outline" className="whitespace-nowrap">
            <Link href="/admin">Agency Login</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section - Responsive text and spacing */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-yellow-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6">
            <span className="text-yellow-400">#</span>NotInMyCity
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Together, we can end human trafficking in Canadian communities
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-black w-full sm:w-auto"
              asChild
            >
              <Link href="/search">Search Database</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-yellow-400 text-black hover:bg-yellow-50 w-full sm:w-auto"
              asChild
            >
              <Link href="/admin">Agency Access</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section - Responsive grid and spacing */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <span className="text-yellow-400 text-2xl">⚡️</span>
                  Rapid Response
                </CardTitle>
                <CardContent className="pt-2">
                  <p className="text-sm sm:text-base">
                    Quick identification and location of trafficking victims
                    through our secure database.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <span className="text-yellow-400 text-2xl">🤝</span>
                  United Action
                </CardTitle>
                <CardContent className="pt-2">
                  <p className="text-sm sm:text-base">
                    Connecting law enforcement and agencies across Canada for
                    coordinated rescue efforts.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <span className="text-yellow-400 text-2xl">🛡️</span>
                  Secure Platform
                </CardTitle>
                <CardContent className="pt-2">
                  <p className="text-sm sm:text-base">
                    Protected database access exclusively for verified law
                    enforcement and agencies.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section - Responsive layout and spacing */}
      <section className="bg-black text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">
            Making Real Impact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-lg sm:max-w-none mx-auto">
            <div className="pb-6 sm:pb-0 border-b sm:border-b-0 border-gray-800">
              <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-1">
                27K+
              </div>
              <div className="text-sm sm:text-base text-slate-400">
                Cases Reported
              </div>
            </div>
            <div className="pb-6 sm:pb-0 border-b sm:border-b-0 border-gray-800">
              <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-1">
                96%
              </div>
              <div className="text-sm sm:text-base text-slate-400">
                Are Women & Girls
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-1">
                400+
              </div>
              <div className="text-sm sm:text-base text-slate-400">
                Agencies Connected
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Access Section - Responsive spacing and text */}
      <section className="bg-yellow-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            Request Access
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 px-4">
            If you&apos;re a law enforcement agency or authorized organization
            in Canada, we&apos;re here to help you join our network.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="border-yellow-400 text-black hover:bg-yellow-100 w-full sm:w-auto"
          >
            Contact Support
          </Button>
        </div>
      </section>

      {/* Footer - Responsive layout */}
      <footer className="mt-auto border-t">
        <div className="container mx-auto px-4 py-4 sm:h-16 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-600 gap-2 sm:gap-0">
          <div>© 2024 #NotInMyCity</div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-black">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-black">
              Terms
            </Link>
            <Link href="/support" className="hover:text-black">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
