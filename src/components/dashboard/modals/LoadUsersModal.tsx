import { useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { Table } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogClose, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

import * as XLSX from 'xlsx';
import { useMutation } from 'react-query';
import createMassiveBookings from '@/services/createMassiveBookings.service';
import { CreateUser, CreateUserSchema } from '@/schemas/user.schema';
import DocumentParserFactory from '@/lib/documentParser/documentParserFactory';

interface LoadUsersModalProps {
	eventId: string;
}

const LoadUsersModal = ({
	eventId,
}: LoadUsersModalProps) => {
	const [ loadedUsers, setLoadedUsers ] = useState<CreateUser>([]);

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
			await createMassiveBookingsMutation.mutateAsync(users);
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='flex items-center gap-2' variant='outline'>
					<Table size={16} />
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
					<Button onClick={handleSave}>Guardar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default LoadUsersModal;