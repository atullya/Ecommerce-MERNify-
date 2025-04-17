import React from 'react'

const Banner = () => {
  return (
    <div>
      <div className="p-6 py-12 bg-violet-600 dark:text-gray-50">
	<div className="container mx-auto">
		<div className="flex flex-col lg:flex-row items-center justify-between">
			<h2 className="text-center text-6xl tracking-tighter font-bold">Up to 
		50%  Off
			</h2>
			<div className="space-x-2 text-center text-2xl py-2 lg:py-0">
				<span>Plus free shipping! Use code:</span>
				<span className="font-bold text-3xl">MERNIFY</span>
			</div>
			<a href="#" rel="noreferrer noopener" className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block dark:bg-gray-900 dark:text-gray-50 dark:border-gray-600">Shop Now</a>
		</div>
	</div>
</div>
    </div>
  )
}

export default Banner
