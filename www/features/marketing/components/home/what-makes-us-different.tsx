"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Globe as GlobeIcon, TrendingUp, Shield, Eye, BookOpen, Heart } from "@/components/icons"
import { GlowingEffect } from "@/components/ui/glowing-effect"

export function WhatMakesUsDifferent() {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-12 text-center">What Makes Us Different</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative">
            <GlowingEffect disabled={false} variant="brand" proximity={120} spread={40} borderWidth={2} inactiveZone={0.3} />
            <div className="overflow-hidden rounded-xl absolute inset-0 pointer-events-none">
              <Users className="absolute -right-2 -bottom-8 size-32 opacity-15" />
            </div>
            <CardContent className="relative space-y-2 pb-4">
              <h3 className="text-lg font-bold">Client-First Model</h3>
              <p className="text-sm text-muted-foreground">
                We work for you, not any one bank — so all recommendations are unbiased.
              </p>
            </CardContent>
          </Card>

          <Card className="relative">
            <GlowingEffect disabled={false} variant="brand" proximity={120} spread={40} borderWidth={2} inactiveZone={0.3} />
            <div className="overflow-hidden rounded-xl absolute inset-0 pointer-events-none">
              <TrendingUp className="absolute -right-2 -bottom-8 size-32 opacity-15" />
            </div>
            <CardContent className="relative space-y-2 pb-4">
              <h3 className="text-lg font-bold">Smarter Rates</h3>
              <p className="text-sm text-muted-foreground">
                We negotiate hard behind the scenes and make multiple lenders compete for you.
              </p>
            </CardContent>
          </Card>

          <Card className="relative">
            <GlowingEffect disabled={false} variant="brand" proximity={120} spread={40} borderWidth={2} inactiveZone={0.3} />
            <div className="overflow-hidden rounded-xl absolute inset-0 pointer-events-none">
              <CheckCircle className="absolute -right-2 -bottom-8 size-32 opacity-15" />
            </div>
            <CardContent className="relative space-y-2 pb-4">
              <h3 className="text-lg font-bold">Faster Process</h3>
              <p className="text-sm text-muted-foreground">
                Digital tools + expert brokers = faster approvals with less paperwork.
              </p>
            </CardContent>
          </Card>

          <Card className="relative">
            <GlowingEffect disabled={false} variant="brand" proximity={120} spread={40} borderWidth={2} inactiveZone={0.3} />
            <div className="overflow-hidden rounded-xl absolute inset-0 pointer-events-none">
              <Eye className="absolute -right-2 -bottom-8 size-32 opacity-15" />
            </div>
            <CardContent className="relative space-y-2 pb-4">
              <h3 className="text-lg font-bold">Complete Transparency</h3>
              <p className="text-sm text-muted-foreground">
                No hidden surprises. Ever. Everything is explained upfront in plain language.
              </p>
            </CardContent>
          </Card>

          <Card className="relative">
            <GlowingEffect disabled={false} variant="brand" proximity={120} spread={40} borderWidth={2} inactiveZone={0.3} />
            <div className="overflow-hidden rounded-xl absolute inset-0 pointer-events-none">
              <Heart className="absolute -right-2 -bottom-8 size-32 opacity-15" />
            </div>
            <CardContent className="relative space-y-2 pb-4">
              <h3 className="text-lg font-bold">Advocacy</h3>
              <p className="text-sm text-muted-foreground">
                We act in your best interests, always.
              </p>
            </CardContent>
          </Card>
          
          <Card className="relative">
            <GlowingEffect disabled={false} variant="brand" proximity={120} spread={40} borderWidth={2} inactiveZone={0.3} />
            <div className="overflow-hidden rounded-xl absolute inset-0 pointer-events-none">
              <Shield className="absolute -right-2 -bottom-8 size-32 opacity-15" />
            </div>
            <CardContent className="relative space-y-2 pb-4">
              <h3 className="text-lg font-bold">Integrity</h3>
              <p className="text-sm text-muted-foreground">
                What we promise is what we deliver.
              </p>
            </CardContent>
          </Card>
          
          <Card className="relative">
            <GlowingEffect disabled={false} variant="brand" proximity={120} spread={40} borderWidth={2} inactiveZone={0.3} />
            <div className="overflow-hidden rounded-xl absolute inset-0 pointer-events-none">
              <GlobeIcon className="absolute -right-2 -bottom-8 size-32 opacity-15" />
            </div>
            <CardContent className="relative space-y-2 pb-4">
              <h3 className="text-lg font-bold">Access for All</h3>
              <p className="text-sm text-muted-foreground">
                First-timers, expats, non-residents, self-employed — we fight for the people the banks often ignore.
              </p>
            </CardContent>
          </Card>
          
          <Card className="relative">
            <GlowingEffect disabled={false} variant="brand" proximity={120} spread={40} borderWidth={2} inactiveZone={0.3} />
            <div className="overflow-hidden rounded-xl absolute inset-0 pointer-events-none">
              <BookOpen className="absolute -right-2 -bottom-8 size-32 opacity-15" />
            </div>
            <CardContent className="relative space-y-2 pb-4">
              <h3 className="text-lg font-bold">Education &gt; Sales</h3>
              <p className="text-sm text-muted-foreground">
                Our job is to advise, not pressure.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
