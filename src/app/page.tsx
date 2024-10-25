import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight">#NotInMyCity</div>
          <Button asChild variant="outline">
            <Link href="/admin">Agency Login</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 bg-yellow-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            <span className="text-yellow-400">#</span>NotInMyCity
          </h1>
          <p className="text-2xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Together, we can end human trafficking in Canadian communities
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
              asChild
            >
              <Link href="/search">Search Database</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-yellow-400 text-black hover:bg-yellow-50"
              asChild
            >
              <Link href="/admin">Agency Access</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-yellow-400 text-2xl">⚡️</span>
                  Rapid Response
                </CardTitle>
                <CardContent className="pt-2">
                  Quick identification and location of trafficking victims
                  through our secure database.
                </CardContent>
              </CardHeader>
            </Card>
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-yellow-400 text-2xl">🤝</span>
                  United Action
                </CardTitle>
                <CardContent className="pt-2">
                  Connecting law enforcement and agencies across Canada for
                  coordinated rescue efforts.
                </CardContent>
              </CardHeader>
            </Card>
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-yellow-400 text-2xl">🛡️</span>
                  Secure Platform
                </CardTitle>
                <CardContent className="pt-2">
                  Protected database access exclusively for verified law
                  enforcement and agencies.
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-black text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Making Real Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                27K+
              </div>
              <div className="text-slate-400">Cases Reported</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">96%</div>
              <div className="text-slate-400">Are Women & Girls</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                400+
              </div>
              <div className="text-slate-400">Agencies Connected</div>
            </div>
          </div>
        </div>
      </section>

      {/* Access Section */}
      <section className="bg-yellow-50 py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Request Access</h2>
          <p className="text-slate-600 mb-8">
            If you&apos;re a law enforcement agency or authorized organization
            in Canada, we&apos;re here to help you join our network.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="border-yellow-400 text-black hover:bg-yellow-100"
          >
            Contact Support
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between text-sm text-slate-600">
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
