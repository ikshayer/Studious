'use client'

import {Responsive, WidthProvider } from "react-grid-layout"

const ResponsiveGridLayout = WidthProvider(Responsive)

export default function Loading() {

    const predefinedLayout = [
        { i: "searchName", x: 0, y: 0, w: 1, h: 1, static: true},
        { i: "searchTags", x: 0, y: 1, w: 1, h: 1, static: true},
        { i: "pagination", x: 2, y: 0, w: 1, h: 1},
        { i: "tip", x: 1, y: 0, w: 1, h: 1},
        { i: "details", x: 1, y: 1, w: 2, h: 5},
        { i: "0", x: 0, y: 2, w: 1, h: 4},
        { i: "1", x: 0, y: 7, w: 1, h: 4},
        { i: "2", x: 1, y: 6, w: 1, h: 4},
        { i: "3", x: 2, y: 6, w: 1, h: 4},
        { i: "4", x: 0, y: 11, w: 1, h: 4},
        { i: "5", x: 1, y: 10, w: 1, h: 4},
        { i: "6", x: 2, y: 10, w: 1, h: 4},
        { i: "7", x: 0, y: 15, w: 1, h: 4},
        { i: "8", x: 1, y: 14, w: 1, h: 4},
        { i: "9", x: 2, y: 14, w: 1, h: 4},
        { i: "10", x: 0, y: 19, w: 1, h: 4},
        { i: "11", x: 1, y: 18, w: 1, h: 4},
        
      ];

    const breakpoints = { lg: 1150, sm: 768, xs: 480};
    const cols = { lg: 3, sm: 2, xs: 1};

    return (
        <>
        <section className="mb-3 w-full">
        <div className="max-[1108px]:block flex-start gap-3 w-full">
        <div className="animate-pulse bg-zinc-200 rounded-xl max-[1108px]:w-full h-[355px] max-profileSm:h-[800px] max-profileMd:mb-3 w-full"/>
        <div
        className="max-[865px]:block max-[1108px]:flex max-[1108px]:gap-3"
        >
        <div className="max-[550px]:block max-[1108px]:flex gap-3 profileSm:max-[1108px]:w-2/3 max-[865px]:w-full">
        
        <div className="min-w-[235px] h-52 rounded-xl max-[1108px]:w-1/2 max-[550px]:w-full animate-pulse bg-zinc-200 ">
        </div>
        <div
        className="mt-4 animate-pulse bg-zinc-200 rounded-xl h-[130px] min-w-[235px] text-4xl max-[1108px]:w-1/2 max-[550px]:w-full max-[550px]:mt-3 max-[1108px]:h-52 max-[1108px]:mt-0"
        >    
        </div>
        </div>
        <div
            className="bg-zinc-200 h-52 rounded-xl py-4 max-profileSm:mt-3 max-profileMd:w-full profileMd:hidden"
            >
            </div>
        
        </div>
        </div>
        <div className="mt-3 max-[865px]:block flex gap-3 w-full">
        <div
            className=" w-1/5 bg-zinc-200 h-52 rounded-xl py-4 max-[1108px]:hidden"
            >
            </div>
            <div
            className="bg-zinc-200 h-52 rounded-xl max-[865px]:mt-3 max-[865px]:!w-full max-[1108px]:w-3/5 w-2/5"
            >
            
            </div>
            <div className="w-2/5 max-profileSm:w-full max-[550px]:mt-3">
            <div
            className='bg-zinc-200 rounded-xl w-full h-24'
            >
            </div>
            <div
            className='bg-zinc-200 rounded-xl w-full h-24 mt-3'
            >
            </div>
            </div>
        </div>
        </section>
        <div className="grid-container w-full min-h-[1024px]">
        <ResponsiveGridLayout
          className="layout w-full h-full"
          cols={{lg:3, sm: 3, xs: 3}}
          layouts={{lg: predefinedLayout}}
          autoSize={false}
          breakpoints={breakpoints}
          rowHeight={45}
          width={1150}
          isDraggable={false}
          useCSSTransforms={true}    
          containerPadding={[0, 0]}
        >
          
          <div
          key={'searchName'}
          className="animate-pulse rounded-md bg-zinc-200"
          />

          <div
          key={'searchTags'}
          className="animate-pulse rounded-md bg-zinc-200"
          />

          <div
          key={'pagination'}
          className="animate-pulse rounded-md bg-zinc-200"
          />

          <div
          key={'details'}
          className="animate-pulse rounded-md bg-zinc-200"
          />

          <div
          key={'tip'}
          className="animate-pulse rounded-md bg-zinc-200"
          />

          {Array.from({length: 10}).map((_, index) => (
              <div
              key={index}
              className="animate-pulse rounded-md bg-zinc-200"
              />
          ))}

      </ResponsiveGridLayout>
      </div>
      </>
        
    );
}