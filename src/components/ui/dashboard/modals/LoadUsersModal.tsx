import { useEffect, useState } from 'react';
import { Button } from '../../button';
import { Table } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogClose, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Input } from '../../input';
import { Label } from '../../label';

import * as XLSX from 'xlsx';
import { useMutation } from 'react-query';
import createMassiveBookings from '@/services/createMassiveBookings.service';
import { CreateUser, CreateUserSchema } from '@/schemas/user.schema';

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

		const reader = new FileReader();
		reader.onload = (e) => {
			const data = e.target?.result;
			const workbook = XLSX.read(data, { type: 'binary' });
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];
			const json: CreateUser = XLSX.utils.sheet_to_json(sheet);
			setLoadedUsers(json);
		};
		reader.readAsBinaryString(file);
	}

	const createMassiveBookingsMutation = useMutation({
		mutationKey: ['createMassiveBookings', eventId],
		mutationFn: async (users: CreateUser) => await createMassiveBookings(users, eventId),
	})

	const handleSave = async () => {
		const validation = CreateUserSchema.safeParse(loadedUsers);
		console.log(validation)
		if (validation.success) {
			const users = loadedUsers.map(user => ({...user, phone: user.phone.toString()}))
			await createMassiveBookingsMutation.mutateAsync(users);
		}
	}

	useEffect(() => {
		console.log(loadedUsers);
	}, [loadedUsers]);

	return (
		<Dialog>
			<DialogTrigger>
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
					<Input onChange={handleFile} id='file' type='file' accept='.xlsx, .csv' />
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