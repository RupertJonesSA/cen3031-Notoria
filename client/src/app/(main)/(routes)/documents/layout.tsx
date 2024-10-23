'use client';

import { Spinner } from "../../../_components/spinner";
import Navigation from "../../_components/navigation"

const RootLayout = ({
  children
}:{
    children: React.ReactNode
}) => {

  return(
    <div className="h-full flex bg-[#1F1F1F]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default RootLayout;
