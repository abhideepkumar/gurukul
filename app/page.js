import DataCard from '@/components/data-card';
import PaymentsHistory from '@/components/payments';
import Search from '@/components/searchbar';

export default function Home() {
    return (
        <main className="">
            <div className="flex justify-end">
                <Search />
            </div>
            <div className='flex flex-row justify-evenly '>
               <DataCard subject="Total Cash in" value={24000} color={"bg-green-100"}/>
               <DataCard subject="Total Cash out" value={18200} color={"bg-red-100"}/>
               <DataCard subject="Received Payments" value={44} color={"bg-blue-100"}/>
            </div>
            <div>
                <PaymentsHistory/>
            </div>
        </main>
    );
}
