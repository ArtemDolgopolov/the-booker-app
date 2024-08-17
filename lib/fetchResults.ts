import { SearchParams } from "@/app/search/page"
import { Result } from "@/types"

export async function fetchResults(searchParams: SearchParams) {
 const username = process.env.OXYLABS_USERNAME
 const password = process.env.OXYLABS_PASSWORD
 
 const url = new URL(searchParams.url)

 Object.keys(searchParams).forEach((key) => {
  if (key === 'url' || key === 'location') return

  const value = searchParams[key as keyof SearchParams]

  if (typeof value === 'string') url.searchParams.append(key, value)
 })

 console.log(url.href)

 const body = {
  source: "universal",
  url: url.href,
  parse: true,
  render: "html",
  parsing_instructions: {
   listings: {
    _fns: [
     {
      _fn: "xpath",
      _args: ["//div[@data-testid='property-card-container']"],
     },
    ],
    _items: {
     title: {
      _fns: [
       {
        _fn: "xpath_one",
        _args: [".//div[@data-testid='title']/text()"],
       },
      ],
     },
     description: {
      _fns: [
       {
        _fn: "xpath_one",
        _args: [".//h4[contains(@class, 'e8acaa0d22 e7baf22fe8')]/text()"],
       },
      ],
     },
     booking_metadata: {
      _fns: [
       {
        _fn: "xpath_one",
        _args: [
         ".//div[contains(@class, 'a9a0892c9b a303a5ca8c')]/div[contains(@class, 'e8acaa0d22 ab107395cb')]/text()",
       ],
       },
      ],
     },
     link: {
      _fns: [
       {
        _fn: "xpath_one",
        _args: [".//a[contains(@class, 'f0ebe87f68')]/@href"],
       },
      ],
     },
     price: {
      _fns: [
       {
        _fn: "xpath_one",
        _args: [`.//span[contains(@class, 'e037993315 ab91cb3011 d9315e4fb0')]/text()`],
       },
      ],
     },
     url: {
      _fns: [
       {
        _fn: "xpath_one",
        _args: [".//img/@src"],
       },
      ],
     },
     rating_word: {
      _fns: [
       {
        _fn: "xpath_one",
        _args: [".//div[@class='d0522b0cca eb02592978 f374b67e8c']/text()"],
       },
      ],
     },
     rating: {
      _fns: [
       {
        _fn: "xpath_one",
        _args: [".//div[@class='d0522b0cca fd44f541d8']/text()"],
       },
      ],
     },
     rating_count: {
      _fns: [
       {
        _fn: "xpath_one",
        _args: [".//div[@class='e8acaa0d22 ab107395cb c60bada9e4']/text()"],
       },
      ],
     },
     distance: {
    _fns: [
     {
      _fn: "xpath_one",
      _args: [
       ".//span[contains(@class, 'cf35c10683')]/span[contains(@class, 'cdebd92b49')]/span[@data-testid='distance']/text()",
     ],
     },
    ],
   },
    },
   },
   total_listings: {
    _fns: [
     {
      _fn: "xpath_one",
      _args: [".//h1/text()"],
     },
    ],
   },
   
  },
 };

 try {
  const response = await fetch('https://realtime.oxylabs.io/v1/queries', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
    }
  });

  const data = await response.json();

  if (data.results.length === 0) {
    console.error('Invalid response format', data);
    return null;
  }

  const result: Result = data.results[0];
  console.log(result.content.listings);
  return result;
} catch (err) {
  console.error('Fetch error', err);
  return null;
}
}