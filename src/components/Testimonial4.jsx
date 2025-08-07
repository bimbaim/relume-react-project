"use client";

import React from "react";
import { StarFull } from "relume-icons";

export function Testimonial4() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto w-full max-w-lg text-center">
          <div className="mb-6 flex items-center justify-center md:mb-8">
            <StarFull className="size-6 text-scheme-text" />
            <StarFull className="size-6 text-scheme-text" />
            <StarFull className="size-6 text-scheme-text" />
            <StarFull className="size-6 text-scheme-text" />
            <StarFull className="size-6 text-scheme-text" />
          </div>
          <blockquote className="heading-h5 font-bold">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Suspendisse varius enim in eros elementum tristique. Duis cursus, mi
            quis viverra ornare, eros dolor interdum nulla, ut commodo diam
            libero vitae erat."
          </blockquote>
          <div className="mt-6 flex w-full flex-col items-center justify-center gap-3 text-center md:mt-8 md:w-auto md:flex-row md:gap-5 md:text-left">
            <div>
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Testimonial avatar 1"
                className="size-14 min-h-14 min-w-14 rounded-full object-cover"
              />
            </div>
            <div className="mb-4 md:mb-0">
              <p>Name Surname</p>
              <p>Position, Company name</p>
            </div>
            <div className="hidden w-px self-stretch bg-scheme-border md:block" />
            <div>
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg"
                alt="Webflow logo 1"
                className="max-h-12"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
