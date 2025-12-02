import Image from "next/image";

export default function EmailPlayground() {


  return (
    <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div>
            <h3 className="text-gray-900 font-semibold text-2xl">Pramod G R</h3>
        <h5 className="text-gray-900 text-xl">Program Manager</h5>
        <span className="text-gray-500">Ph - +91 988633005</span>
        </div>
        <div className="md:w-[1px] bg-gray-300 md:h-[200px] h-[1px]  w-full ">&nbsp;</div>
        <div className="text-sm leading-6">
            <div className="flex items-end gap-12">
                <div>
                    <Image src={'/simtech-logo.png'} height={200} width={200} alt="Simtech Logo" className="h-[56px] w-auto md:-mb-2 mb-2" />
                 <span className="md:ml-9">Gopalan Signature Tower</span>
                </div>
                <Image src={'/iso-logo.png'} height={200} width={200} alt="ISO Logo" className="h-[64px] w-auto mb-[3px]" />
            </div>
           
            
            <div className="md:ml-9">
                <span>3rd, Floor, No.6, Old Madras Road, Nagavarapalya,</span>
            <br />
            <span>C.V.Raman Nagar, Bangalore - 560093</span>
            <br />
            <span>Website - <span className="font-semibold">
                <a href="https://www.simtech.one" target="_blank" rel="noopener noreferrer">www.simtech.one</a>
                </span></span>
            </div>
        </div>
    </div>
  )
}