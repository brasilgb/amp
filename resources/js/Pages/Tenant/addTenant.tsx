import { AddButton, BackButton, SaveButton } from '@/Components/Buttons'
import { Card, CardBody, CardContainer, CardFooter, CardHeader, CardHeaderContent } from '@/Components/Card'
import { BreadCrumbTop, HeaderContent, TitleTop } from '@/Components/PageTop'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { maskCep, maskCpfCnpj, maskInscEstadual, maskPhone, unMask } from '@/Utils/mask'
import { Head, useForm } from '@inertiajs/react'
import { IoPeopleSharp } from 'react-icons/io5'

const AddCustomer = () => {

  const { data, setData, post, progress, processing, errors } = useForm({
    name: "",
  });

  function handleSubmit(e: any) {
    e.preventDefault();
    post(route("customers.store"));
  }

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      <main className='animate__animated animate__fadeIn p-6'>
        <Card>
          <HeaderContent>
            <TitleTop>
              <IoPeopleSharp size={30} />
              <span className="ml-2">Clientes</span>
            </TitleTop>
            <BreadCrumbTop
              links={[
                { url: "/customers", label: "Clientes" },
                { url: null, label: "Adicionar cliente" },
              ]}
            />
          </HeaderContent>
          <CardContainer>
            <CardHeader>
              <CardHeaderContent>
                <BackButton url={"/customers"} label={"Voltar"} />
              </CardHeaderContent>
              <CardHeaderContent>
                <></>
              </CardHeaderContent>
            </CardHeader>
            <form onSubmit={handleSubmit} autoComplete="off">
              <CardBody className=" border-y border-gray-100">
                <div className="px-3 my-4">

                  <div className="flex flex-col col-span-3">
                    <label
                      className="label-form"
                      htmlFor="name"
                    >
                      Nome
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={data.name}
                      onChange={(e) =>
                        setData("name", e.target.value)
                      }
                      className="input-form"
                    />
                    {errors.name && (
                      <div className="text-sm text-red-500">
                        {errors.name}
                      </div>
                    )}
                  </div>
                </div>
              </CardBody>
              <CardFooter>
                <SaveButton />
              </CardFooter>
            </form>
          </CardContainer>
        </Card>
      </main>
    </AuthenticatedLayout>
  )
}

export default AddCustomer