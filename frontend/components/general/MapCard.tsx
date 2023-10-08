'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandGroup, CommandItem } from "../ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const routes: Array<{ name: string, url: string }> = [
  {
    name: "Panoramski put",
    url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44876.37874606231!2d14.495283948632812!3d45.33319259999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47649f9ea058af9b%3A0xb6a329bb08fea459!2sPanoramski%20put!5e0!3m2!1sen!2shr!4v1696719521698!5m2!1sen!2shr',
  },
  {
    name: 'Šetnica Plešivac',
    url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44846.011341321806!2d14.329475648632815!3d45.371503099999984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4764a592ad45751d%3A0xe71898bd60e6469c!2zxaBldG5pY2EgUGxlxaFpdmFj!5e0!3m2!1sen!2shr!4v1696719382011!5m2!1sen!2shr',
  },
  {
    name: "Lončeva staza",
    url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44837.92015762989!2d14.310282748632812!3d45.3817064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4764a571e9a25009%3A0x189351deea963e53!2zTG9uxI1ldmEgR3Jpxb5h!5e0!3m2!1sen!2shr!4v1696721010184!5m2!1sen!2shr',
  },
  {
    name: "Izvor Riječine",
    url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44803.693375031435!2d14.348321548632814!3d45.42484790000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4764a5ad7898a69f%3A0xe5055c321c18c088!2sIzvor%20Rje%C4%8Dine!5e0!3m2!1sen!2shr!4v1696719798353!5m2!1sen!2shr',
  },
]

const MapCard = () => {
  const [route, setRoute] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Card className='bg-black-300 border-0 text-white px-2 py-8 w-full'>
      <CardTitle className='px-5 text-primary'>
        Going for a walk or a bycicle ride can have a better effect!
      </CardTitle>
      <CardDescription className='pt-2 px-5 paragraph-regular flex-start flex-col'>
        Here our recommended routes:
      </CardDescription>
      <CardContent className="flex-center px-0 pt-4 flex-col gap-5 px-5">
        <div className="flex flex-col mt-5 gap-3 self-start">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="!bg-black-300 text-white hover:text-white/90">
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {routes[route].name}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command className="bg-black-300">
                <CommandGroup>
                  {routes.map((routeData, index) => (
                    <CommandItem
                      className="!bg-black-300 !text-white"
                      key={routeData.name}
                      onSelect={() => {
                        setRoute(index)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          route === index ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {routeData.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <iframe src={routes[route].url} width="100%" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </CardContent>
    </Card>
  )
}

export default MapCard
