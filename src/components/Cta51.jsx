"use client";

import { Button } from "@relume_io/relume-ui";
// import { Card } from "@relume_io/relume-ui";
import { Card } from "./ui/card";
import React from "react";

export function Cta51() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <Card className="flex flex-col items-center p-8 md:p-12 lg:p-16">
          <div className="max-w-lg text-center">
            <h2 className="heading-h2 mb-5 font-bold md:mb-6">
              Medium length heading goes here
            </h2>
            <p className="text-medium">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
            <Button title="Button">Button</Button>
            <Button title="Button" variant="secondary">
              Button
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
