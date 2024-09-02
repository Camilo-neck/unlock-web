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
import useSession from "@/hooks/useSession";
import { formatDateString } from "@/lib/utils";
import LoadUsersModal from "./modals/LoadUsersModal";
import { Event } from "@/schemas/event.schema";
import { Booking } from "@/schemas/booking.schema";

interface ContentProps {
    eventData: Event;
    bookings: Booking[];
}

const Content = ({
    eventData,
    bookings,
}: ContentProps) => {
    const { toggleOpen } = useDashboardSidebars();
    const { data: { user } } = useUser();

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
                        <div className="text-2xl font-bold">{bookings.length}</div>
                        <div className="text-sm text-gray-500">Asistentes</div>
                    </div>
                </div>
                
                <div className="flex items-center space-x-4 bg-blue-50 rounded-lg p-4">
                    <MonitorSmartphone className="h-8 w-8 text-blue-500" />
                    <div>
                        <div className="text-2xl font-bold">{ bookings.reduce((prev, curr) => prev + (curr.checked_in ? 1 : 0), 0) }</div>
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
                        <LoadUsersModal eventId={eventData.id} />
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
                                <TableHead>Email</TableHead>
                                <TableHead>Número telefónico</TableHead>
                                <TableHead>Dispositivo</TableHead>
                                <TableHead>Alojamiento</TableHead>
                                <TableHead>Fecha Ingreso</TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings?.map((booking, index) => (
                                <TableRow key={booking.id}>
                                    <TableCell className="font-medium">
                                        {booking.user.name || '-'}
                                    </TableCell>
                                    <TableCell>{booking.user.email}</TableCell>
                                    <TableCell>{booking.user.phone || '-'}</TableCell>
                                    <TableCell>{booking.device.name}</TableCell>
                                    <TableCell>
                                        {index % 3 === 0 ? (
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
                                    <TableCell>{formatDateString(booking.created_at)}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-sm text-xs ${
                                                booking.checked_in
                                                    ? "bg-secondary text-secondary-foreground border border-secondary-foreground"
                                                    : "bg-error text-error-foreground border border-error-foreground"
                                            }`}
                                        >
                                            {booking.checked_in ? "Ingresado" : "Fuera"}
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
