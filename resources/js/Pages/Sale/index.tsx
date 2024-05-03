import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

type Props = {}

const Sales = (props: Props) => {
  return (
    <AuthenticatedLayout>
    <Head title="Vendas" />

      <div className="py-12">
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm rounded">
            Sales
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Sales