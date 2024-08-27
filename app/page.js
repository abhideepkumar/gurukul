// import DataCard from '@/components/data-card';
import PaymentsHistory from '@/components/payments';
import Link from 'next/link';

export default function Home() {
    return (
        <main className="py-5">
            {/* <div className='flex flex-row justify-evenly mb-5'>
               <DataCard subject="Total Cash in" value={"Rs 24000"} color={"bg-green-100"}/>
               <DataCard subject="Total Cash out" value={"Rs 18200"} color={"bg-red-100"}/>
               <DataCard subject="Received Payments" value={"44%"} color={"bg-blue-100"}/>
            </div> */}
            <div className="flex flex-row justify-evenly mb-5">
                <Link
                    href="/accept-payment"
                    className="inline-flex items-center gap-2 border bg-gray-800 text-white hover:bg-slate-600 rounded-md px-4 py-2 text-xl"
                >
                    Accept Payment
                </Link>
                <Link
                    href="/deposit"
                    className="inline-flex items-center gap-2 border-2 border-emerald-600 bg-green-100 hover:bg-green-200 rounded-md px-4 py-2 text-xl"
                >
                    Deposit Cash
                </Link>
                <Link
                    href="/withdraw"
                    className="inline-flex items-center gap-2 border-2 border-rose-600 bg-rose-100 hover:bg-rose-200 rounded-md px-4 py-2 text-xl"
                >
                    Withdraw Cash
                </Link>
            </div>
            <div>
                <PaymentsHistory />
            </div>
        </main>
    );
}
