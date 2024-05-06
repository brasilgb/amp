import { AddButton, DeleteButton, EditButton } from "@/Components/Buttons"
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

const Subsidiary = ({ subsidiaries }: any) => {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <main className='animate__animated animate__fadeIn p-6'>
                <Card>
                    <HeaderContent>
                        <TitleTop>
                            <IoPeopleSharp size={30} />
                            <span className="ml-2">Filiais</span>
                        </TitleTop>
                        <BreadCrumbTop links={[{ url: null, label: "Filiais" }]} />
                    </HeaderContent>
                    <CardContainer>
                        <CardHeader>
                            <CardHeaderContent>
                                <InputSearch
                                    placeholder={"Buscar por descrição ou cnpj"}
                                    url={"subsidiaries.index"}
                                />
                            </CardHeaderContent>
                            <CardHeaderContent>
                                <AddButton
                                    url={route('subsidiaries.create')}
                                    label={"Filial"}
                                />
                            </CardHeaderContent>
                        </CardHeader>
                        <FlashMessage message={'flash'} />
                        <CardBody>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <TableHead>Empresa</TableHead>
                                        <TableHead>Nº Filial</TableHead>
                                        <TableHead>Filial</TableHead>
                                        <TableHead>CNPJ</TableHead>
                                        <TableHead>Insc. estadual</TableHead>
                                        <TableHead>Telefone</TableHead>
                                        <TableHead>Cadastro</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {subsidiaries.data.map((subsidiary: any) => (
                                        <Fragment key={subsidiary.id}>
                                            <TableRow>
                                                <TableCell>{subsidiary.id}</TableCell>
                                                <TableCell>
                                                    {subsidiary.tenant.name}
                                                </TableCell>
                                                <TableCell>
                                                    {subsidiary.subnumber}
                                                </TableCell>
                                                <TableCell>
                                                    {subsidiary.subname}
                                                </TableCell>
                                                <TableCell>
                                                    {maskCnpj(subsidiary.cnpj)}
                                                </TableCell>
                                                <TableCell>
                                                    {maskInscEstadual(subsidiary.statereg)}
                                                </TableCell>
                                                <TableCell>
                                                    {subsidiary.telephone}
                                                </TableCell>
                                                <TableCell>
                                                    {moment(
                                                        subsidiary.created_at,
                                                    ).format("DD/MM/YYYY")}
                                                </TableCell>
                                                <TableCell className="flex items-center justify-end gap-2">
                                                    <EditButton
                                                        url={route(
                                                            "subsidiaries.edit",
                                                            subsidiary.id,
                                                        )}
                                                    />
                                                    <DeleteButton
                                                        url="subsidiaries.destroy"
                                                        param={subsidiary.id}
                                                        identify={`o subsidiary ${subsidiary.subname}`}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        </Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardBody>
                        <CardFooter>
                            <Pagination data={subsidiaries} />
                        </CardFooter>
                    </CardContainer>
                </Card>
            </main>
        </AuthenticatedLayout >
    )
}

export default Subsidiary