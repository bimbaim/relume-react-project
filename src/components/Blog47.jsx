"use client";

import { Button } from "@relume_io/relume-ui";
import { Card } from "./ui/card";
import React from "react";

export function Blog47() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto w-full max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Blog</p>
            <h2 className="heading-h2 mb-5 font-bold md:mb-6">
              Short heading goes here
            </h2>
            <p className="text-medium">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 lg:gap-x-12">
          <Card>
            <a href="#" className="w-full max-w-full">
              <div className="w-full overflow-hidden">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image"
                  className="aspect-video size-full object-cover"
                />
              </div>
            </a>
            <div className="px-5 py-6 md:p-6">
              <a href="#" className="text-small mb-2 flex font-semibold">
                Category
              </a>
              <a href="#" className="mb-2 block max-w-full">
                <h5 className="heading-h5 font-bold">
                  Blog title heading will go here
                </h5>
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros.
              </p>
              <div className="mt-6 flex items-center">
                <div className="mr-4">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                    alt="Relume placeholder avatar"
                    className="size-12 min-h-12 min-w-12 overflow-hidden rounded-full object-cover"
                  />
                </div>
                <div>
                  <h6 className="text-small font-semibold">Full name</h6>
                  <div className="flex items-center">
                    <p className="text-small">11 Jan 2022</p>
                    <span className="mx-2">•</span>
                    <p className="text-small">5 min read</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <a href="#" className="w-full max-w-full">
              <div className="w-full overflow-hidden">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image"
                  className="aspect-video size-full object-cover"
                />
              </div>
            </a>
            <div className="px-5 py-6 md:p-6">
              <a href="#" className="text-small mb-2 flex font-semibold">
                Category
              </a>
              <a href="#" className="mb-2 block max-w-full">
                <h5 className="heading-h5 font-bold">
                  Blog title heading will go here
                </h5>
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros.
              </p>
              <div className="mt-6 flex items-center">
                <div className="mr-4">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                    alt="Relume placeholder avatar"
                    className="size-12 min-h-12 min-w-12 overflow-hidden rounded-full object-cover"
                  />
                </div>
                <div>
                  <h6 className="text-small font-semibold">Full name</h6>
                  <div className="flex items-center">
                    <p className="text-small">11 Jan 2022</p>
                    <span className="mx-2">•</span>
                    <p className="text-small">5 min read</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="mt-12 flex items-center justify-center md:mt-20">
          <Button title="View all" variant="secondary">
            View all
          </Button>
        </div>
      </div>
    </section>
  );
}
