import { AddButton, AgendaClienteButton, DeleteButton, EditButton, OrderButton } from "@/Components/Buttons"
import { Card, CardBody, CardContainer, CardFooter, CardHeader, CardHeaderContent } from "@/Components/Card"
import FlashMessage from "@/Components/FlashMessage"
import InputSearch from "@/Components/InputSearch"
import { BreadCrumbTop, HeaderContent, TitleTop } from "@/Components/PageTop"
import Pagination from "@/Components/Pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Table"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { maskCnpj, maskInscEstadual } from "@/Utils/mask"
import { Head, usePage } from '@inertiajs/react'
import moment from "moment"
import React, { Fragment } from 'react'
import { IoPeopleSharp } from "react-icons/io5"

type Props = {}

const Tenant = ({ tenants }: any) => {
    const { flash } = usePage().props;

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
                        <BreadCrumbTop links={[{ url: null, label: "Clientes" }]} />
                    </HeaderContent>
                    <CardContainer>
                        <CardHeader>
                            <CardHeaderContent>
                                <InputSearch
                                    placeholder={"Buscar por descrição ou cnpj"}
                                    url={"customers.index"}
                                />
                            </CardHeaderContent>
                            <CardHeaderContent>
                                <AddButton
                                    url={route('customers.create')}
                                    label={"Cliente"}
                                />
                            </CardHeaderContent>
                        </CardHeader>
                        <FlashMessage message={'flash'} />
                        <CardBody>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <TableHead>Descrição</TableHead>
                                        <TableHead>CNPJ</TableHead>
                                        <TableHead>Inscrição</TableHead>
                                        <TableHead>Telefone</TableHead>
                                        <TableHead>Cadastro</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tenants.data.map((cliente: any) => (
                                        <Fragment key={cliente.id}>
                                            <TableRow>
                                                <TableCell>{cliente.id}</TableCell>
                                                <TableCell>
                                                    {cliente.descricao}
                                                </TableCell>
                                                <TableCell>
                                                    {maskCnpj(cliente.cnpj)}
                                                </TableCell>
                                                <TableCell>
                                                    {maskInscEstadual(cliente.inscricao)}
                                                </TableCell>
                                                <TableCell>
                                                    {cliente.telefone}
                                                </TableCell>
                                                <TableCell>
                                                    {moment(
                                                        cliente.created_at,
                                                    ).format("DD/MM/YYYY")}
                                                </TableCell>
                                                <TableCell className="flex items-center justify-end gap-2">
                                                    <EditButton
                                                        url={route(
                                                            "customers.edit",
                                                            cliente.id,
                                                        )}
                                                    />
                                                    <DeleteButton
                                                        url="customers.destroy"
                                                        param={cliente.id}
                                                        identify={`o cliente ${cliente.descricao}`}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        </Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardBody>
                        <CardFooter>
                            <Pagination data={tenants} />
                        </CardFooter>
                    </CardContainer>
                </Card>
            </main>
        </AuthenticatedLayout >
    )
}

export default Tenant