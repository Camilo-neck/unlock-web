import { useState } from 'react';
import { Button } from '../../ui/button';
import { FileUp, } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogClose, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

import { useMutation } from 'react-query';
import createMassiveBookings from '@/services/mutations/createMassiveBookings.service';
import { CreateUser, CreateUserSchema } from '@/schemas/user.schema';
import DocumentParserFactory from '@/lib/documentParser/documentParserFactory';
import { useToast } from '@/hooks/use-toast';
import { Booking } from '@/schemas/booking.schema';
import useBookings from '@/stores/useBookings';
import { Spinner } from '@/components/ui/spinner';
import getBookingsByEvent from '@/services/queries/getBookingsByEvent.service';

interface LoadUsersModalProps {
	eventId: string;
}

const LoadUsersModal = ({
	eventId,
}: LoadUsersModalProps) => {
	const [ loadedUsers, setLoadedUsers ] = useState<CreateUser>([]);
	const { setBookings } = useBookings();
	const { toast } = useToast();

	const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const parser = DocumentParserFactory.createParser(file);
		parser.parse().then((data) => setLoadedUsers(data));
	}

	const createMassiveBookingsMutation = useMutation({
		mutationKey: ['createMassiveBookings', eventId],
		mutationFn: async (users: CreateUser) => await createMassiveBookings(users, eventId),
	})

	const handleSave = async () => {
		const validation = CreateUserSchema.safeParse(loadedUsers);
		if (validation.success) {
			const users = loadedUsers.map(user => ({...user, phone: user.phone.toString()}))
			try {
				await createMassiveBookingsMutation.mutateAsync(users);
				const bookings = await getBookingsByEvent(eventId);
				setBookings(bookings)
				toast({
					title: 'Usuarios cargados',
					description: 'Los usuarios se han cargado correctamente',
				})
			} catch (error: any) {
				toast({
					title: 'Error al cargar usuarios',
					description: 'Hubo un error al cargar los usuarios: ' + error?.message,
					variant: 'destructive',
				})
			}
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='flex items-center gap-2' variant='outline'>
					<FileUp size={16} />
					Cargar Usuarios
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Cargar Usuarios</DialogTitle>
					<DialogDescription>
						Sube tu archivo Excel para cargar usuarios	
					</DialogDescription>
				</DialogHeader>
				<div>
					<Label htmlFor='file'>Archivo</Label>
					<Input onChange={handleFile} id='file' type='file' accept='.xlsx, .csv, .json' />
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Cancelar</Button>
					</DialogClose>
					<Button onClick={handleSave}>
						Guardar
						{
							createMassiveBookingsMutation.isLoading && <Spinner className='ml-2' />
						}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default LoadUsersModal;