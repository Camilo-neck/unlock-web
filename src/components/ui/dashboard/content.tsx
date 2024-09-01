'use client'

import { Input } from "../input";
import {
    Check,
    Logs,
    MonitorSmartphone,
    UserCircle2,
    Users,
    X,
} from "lucide-react";
import { Button } from "../button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../table";
import useDashboardSidebars from "@/stores/useDashboardSidebars";
import useUser from "@/hooks/useUser";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import getEvent from "@/services/getEvent";
import useSession from "@/hooks/useSession";
import { formatDateString } from "@/lib/utils";
import LoadUsersModal from "./modals/LoadUsersModal";

const customers = [
    {
        name: "John Cooper",
        username: "Microsoft",
        phone: "(123) 456-7890",
        email: "john@microsoft.com",
        status: "Checked-in",
        device: "RJ486",
        staying: true,
    },
    {
        name: "Floyd Miles",
        username: "Yahoo",
        phone: "(234) 567-8901",
        email: "floyd@yahoo.com",
        status: "Checked-in",
        device: "BM236",
        staying: true,
    },
    {
        name: "Ronald Richards",
        username: "Adobe",
        phone: "(345) 678-9012",
        email: "ronald@adobe.com",
        status: "No Show",
        device: "LA874",
        staying: false,
    },
    {
        name: "Marvin McKinney",
        username: "Tesla",
        phone: "(456) 789-0123",
        email: "marvin@tesla.com",
        status: "No Show",
        device: "BM236",
        staying: false,
    },
    {
        name: "Jerome Bell",
        username: "Google",
        phone: "(567) 890-1234",
        email: "jerome@google.com",
        status: "Checked-in",
        device: "RJ486",
        staying: true,
    },
    {
        name: "Kathryn Murphy",
        username: "Microsoft",
        phone: "(678) 901-2345",
        email: "kathryn@microsoft.com",
        status: "No Show",
        device: "LA874",
        staying: false,
    },
    {
        name: "Jacob Jones",
        username: "Yahoo",
        phone: "(789) 012-3456",
        email: "jacob@yahoo.com",
        status: "Checked-in",
        device: "RJ486",
        staying: true,
    },
    {
        name: "Kristin Watson",
        username: "Facebook",
        phone: "(890) 123-4567",
        email: "kristin@facebook.com",
        status: "No Show",
        device: "BM254",
        staying: false,
    },
];

const Content = () => {
    const { toggleOpen } = useDashboardSidebars();
    const { data: { session } } = useSession();
    const { data: { user } } = useUser();
    const searchParams = useSearchParams();

    const { data: eventData } = useQuery({
        queryKey: ["eventData", searchParams.get("event")],
        queryFn: () => getEvent(session?.access_token ?? '' , searchParams.get("event") ?? ''),
        enabled: !!session?.access_token && !!searchParams.get("event"),
    })

    return (
        <div className="w-full mx-auto space-y-6 overflow-x-hidden">
            <div className="flex items-center justify-between">
                <h1 className="text-black text-2xl font-bold">Hola {user?.app_metadata.full_name ?? 'Unnamed'} 👋,</h1>
            </div>
            <div className="flex items-center flex-wrap lg:flex-nowrap justify-between space-x-4 space-y-2 bg-purple-50 rounded-lg p-4">
                <Users className="h-8 w-8 text-purple-500" />
                <div className="max-w-sm text-wrap break-words">
                    <p className="text-gray-500">{ eventData?.description }</p>
                </div>
                <div>
                    <div className="text-2xl font-bold">{ eventData?.name }</div>
                    <div className="text-sm text-gray-500">{ eventData?.location }</div>
                </div>
                <div>
                    <p className="font-bold">Fecha de Inicio: <span className="font-normal text-gray-600">{ eventData?.start_time && formatDateString(eventData?.start_time) }</span></p>
                    <p className="font-bold">Fecha de Finalización: <span className="font-normal text-gray-600">{ eventData?.end_time && formatDateString(eventData?.end_time) }</span></p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="font-bold">Cupos</p>
                    <p className="text-gray-600 text-2xl">{eventData?.capacity}</p>
                </div>
            </div>
            {/* Stats section */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-4 bg-green-50 rounded-lg p-4">
                    <UserCircle2 className="h-8 w-8 text-green-500" />
                    <div>
                        <div className="text-2xl font-bold">5,423</div>
                        <div className="text-sm text-gray-500">Asistentes</div>
                    </div>
                </div>
                
                <div className="flex items-center space-x-4 bg-blue-50 rounded-lg p-4">
                    <MonitorSmartphone className="h-8 w-8 text-blue-500" />
                    <div>
                        <div className="text-2xl font-bold">189</div>
                        <div className="text-sm text-gray-500">Ingresados</div>
                    </div>
                </div>
            </div>
            {/* Table section */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">Todos los Asistentes</h2>
                    <div className="flex items-center gap-4">
                        <Input
                            className="w-64"
                            placeholder="Buscar"
                            type="search"
                        />
                        <LoadUsersModal />
                        <Button onClick={()=>toggleOpen()}>
                            <div className="flex items-center gap-1">
                                <Logs size={16} /> Logs
                            </div>
                        </Button>
                    </div>
                </div>
                <div className="w-full min-w-[1024px]">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre del Asistente</TableHead>
                                <TableHead>Nombre de usuario</TableHead>
                                <TableHead>Número telefónico</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Dispositivo</TableHead>
                                <TableHead>Alojamiento</TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow key={customer.email}>
                                    <TableCell className="font-medium">
                                        {customer.name}
                                    </TableCell>
                                    <TableCell>{customer.username}</TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.device}</TableCell>
                                    <TableCell>
                                        {customer.staying ? (
                                            <Check
                                                className="text-secondary-foreground"
                                                size={16}
                                            />
                                        ) : (
                                            <X
                                                className="text-error-foreground"
                                                size={16}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-sm text-xs ${
                                                customer.status === "Checked-in"
                                                    ? "bg-secondary text-secondary-foreground border border-secondary-foreground"
                                                    : "bg-error text-error-foreground border border-error-foreground"
                                            }`}
                                        >
                                            {customer.status}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                {/* <div className="flex w-full items-center justify-between px-4 py-4 border-t">
                    <div className="text-sm text-gray-500">
                        Showing 8 out of 100 entries
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                            Previous
                        </Button>
                        <Button variant="outline" size="sm">
                            1
                        </Button>
                        <Button variant="outline" size="sm">
                            2
                        </Button>
                        <Button variant="outline" size="sm">
                            3
                        </Button>
                        <Button variant="outline" size="sm">
                            Next
                        </Button>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Content;
