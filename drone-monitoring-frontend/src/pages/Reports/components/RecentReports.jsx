const reports=[

{

name:"Fleet Summary.pdf",

date:"Today"

},

{

name:"Mission Analytics.xlsx",

date:"Yesterday"

},

{

name:"Telemetry.csv",

date:"2 Days Ago"

}

];

function RecentReports(){

return(

<div className="rounded-2xl border border-[#262626] bg-[#111111]">

<div className="border-b border-[#262626] p-5">

<h2 className="text-xl font-bold text-white">

Recent Reports

</h2>

</div>

<div>

{

reports.map((report,index)=>(

<div

key={index}

className="flex items-center justify-between border-b border-[#222] p-5 last:border-none">

<div>

<h3 className="font-semibold text-white">

{report.name}

</h3>

<p className="text-sm text-gray-500">

{report.date}

</p>

</div>

<button className="rounded-lg bg-[#D4AF37] px-4 py-2 font-semibold text-black">

Download

</button>

</div>

))

}

</div>

</div>

);

}

export default RecentReports;