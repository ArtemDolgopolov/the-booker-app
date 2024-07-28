'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCityName,
  setCheckInDate,
  setCheckOutDate,
  setNumOfAdults,
  setNumOfChildren,
  setRooms
} from '../redux/slices/searchFormSlice'
import { RootState } from '../redux/store'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar } from './ui/calendar'

export const formSchema = z.object({
 cityname: z.string().min(2).max(50),
 dates: z.object({
  from: z.date({required_error: 'Please, select a check-in date'}),
  to: z.date({required_error: 'Please, select a check-out date'}),
 }),
 num_of_adults: z.string().min(1, {message: 'At least 1 adult should be selected'})
 .max(12, {message: 'Maximum 12 adults'}),
 num_of_children: z.string().min(0)
 .max(12, {message: 'Maximum 12 children'}),
 rooms: z.string().min(1, {message: 'At least 1 room should be selected'}),
})

function SearchForm() {
 const dispatch = useDispatch()
 const router = useRouter()

 const searchForm = useSelector((state: RootState) => state.searchForm)

 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   cityname: '',
   dates: {
    from: undefined,
    to: undefined,
   },
   num_of_adults: '1',
   num_of_children: '0',
   rooms: '1'
  },
 })

 function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values)

  const checkin_day = values.dates.from.getDate().toString()
  const checkin_month = (values.dates.from.getMonth() + 1).toString()
  const checkin_year = values.dates.from.getFullYear().toString()
  const checkout_day = values.dates.to.getDate().toString()
  const checkout_month = (values.dates.to.getMonth() + 1).toString()
  const checkout_year = values.dates.to.getFullYear().toString()

  const checkin = `${checkin_year}-${checkin_month}-${checkin_day}`
  const checkout = `${checkout_year}-${checkout_month}-${checkout_day}`

  dispatch(setCityName(values.cityname))
  dispatch(setCheckInDate(checkin))
  dispatch(setCheckOutDate(checkout))
  dispatch(setNumOfAdults(parseInt(values.num_of_adults)))
  dispatch(setNumOfChildren(parseInt(values.num_of_children)))
  dispatch(setRooms(parseInt(values.rooms)))

  const url = new URL('https://www.booking.com/searchresults.html')
  url.searchParams.set('ss', values.cityname)
  url.searchParams.set('checkin', checkin)
  url.searchParams.set('checkout', checkout)
  url.searchParams.set('group_adults', values.num_of_adults)
  url.searchParams.set('group_children', values.num_of_children)
  url.searchParams.set('no_rooms', values.rooms)

  router.push(`/search?url=${url.href}`)
 }

  return (
    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col lg:flex-row lg:max-w-6xl lg:mx-auto items-center justify-center space-x-0 lg:space-x-2 space-y-4 lg:space-y-0 rounded-lg">
      <div className='grid w-full lg:max-w-sm items-center gap-1.5'>
       <FormField 
        control={form.control}
        name='cityname'
        render={({field}) => (
         <FormItem>
          <FormLabel className='text-white flex'>
           Location
          </FormLabel>
          <FormMessage />
          <FormControl>
           <Input 
            placeholder='Search locations' 
            {...field}
            onChange={(e) => {
             field.onChange(e)
             dispatch(setCityName(e.target.value))
           }} 
           />
          </FormControl>
         </FormItem>
        )}
       />
      </div>

      <div className='grid w-full lg:max-w-sm flex-1 items-center gap-1.5'>
       <FormField
        control={form.control}
        name='dates'
        render={({ field }) => (
         <FormItem className='flex flex-col'>
          <FormLabel className='text-white'>
           Dates
          </FormLabel>
          <FormMessage />

          <Popover>
           <PopoverTrigger asChild>
            <FormControl>
             <Button
              id='date'
              name='dates'
              variant={'outline'}
              className={cn(
               'w-full lg:w-[300px] justify-start text-left font-normal',
               !field.value.from && 'text-muted-foreground'
              )}
             >
              {field.value?.from ? (
                field.value?.to ? (
                 <>
                 {format(field.value?.from, 'LLL dd, y')} -{' '}
                 {format(field.value?.to, 'LLL dd, y')}
                </>
                ) : (
                 format(field.value?.from, 'LLL dd, y')
                 )
                ) : (
                  <span>Select dates</span>
                )}
             </Button>
            </FormControl>
           </PopoverTrigger>
           <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
             initialFocus
             mode='range'
             selected={field.value}
             defaultMonth={field.value.from}
             onSelect={(dates) => {
              field.onChange(dates)
              dispatch(setCheckInDate(dates?.from))
              dispatch(setCheckOutDate(dates?.to))
             }}
             numberOfMonths={2}
             disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            />
           </PopoverContent>
          </Popover>
         </FormItem>
        )}
       />
      </div>

      <div className='flex w-full items-center space-x-2'>
       <div className='grid items-center flex-1'>
        <FormField
         control={form.control}
         name='num_of_adults'
         render={({ field }) => (
          <FormItem className='flex flex-col'>
           <FormLabel className='text-white'>Adults</FormLabel>
           <FormMessage />
           <FormControl>
            <Input type='number' placeholder='Adults' {...field} />
           </FormControl>
          </FormItem>
         )}
        />
       </div>

       <div className='grid items-center flex-1'>
        <FormField
         control={form.control}
         name='num_of_children'
         render={({ field }) => (
          <FormItem className='flex flex-col'>
           <FormLabel className='text-white'>Children</FormLabel>
           <FormMessage />
           <FormControl>
            <Input type='number' placeholder='Children' {...field} />
           </FormControl>
          </FormItem>
         )}
        />
       </div>

       <div className='grid items-center flex-1'>
        <FormField
         control={form.control}
         name='rooms'
         render={({ field }) => (
          <FormItem className='flex flex-col'>
           <FormLabel className='text-white'>Rooms</FormLabel>
           <FormMessage />
           <FormControl>
            <Input type='number' placeholder='Rooms' {...field} />
           </FormControl>
          </FormItem>
         )}
        />
       </div>

       <div className='mt-auto'>
        <Button type='submit' className='bg-blue-500 text-base'>
         Search
        </Button>
       </div>
      </div>

     </form>
    </Form>
  )
}

export default SearchForm