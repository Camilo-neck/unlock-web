import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogClose, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import createDevice from '@/services/mutations/createDevice.service';
import getEventDevices from '@/services/queries/getEventDevices.service';
import { Cpu } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import DeviceCard from '../deviceCard';
import { Spinner } from '@/components/ui/spinner';

interface CreateDevicesModalProps {
	eventId: string
}

const CreateDevicesModal = ({
	eventId
}: CreateDevicesModalProps) => {
	const form = useForm<{ name: string }>();
	const { control, handleSubmit, reset } = form;

	const { toast } = useToast()

	const { data: devices, refetch } = useQuery({
		queryKey: ['devices', eventId],
		queryFn: () => getEventDevices(eventId),
		onSuccess: (data) => console.log(data)
	})

	const createDeviceMutation = useMutation({
		mutationKey: ['createDevice', eventId],
		mutationFn: createDevice
	})

	const onSubmit = async (data: { name: string }) => {
		const payload = {
			name: data.name,
			event_id: eventId,
			status: 'active'
		}
		try {
			await createDeviceMutation.mutateAsync(payload)
			reset()
			refetch()
			toast({
				title: "Creación exitosa",
				description: "Se ha creado su dispositivo satisfactoriamente",
			})
		} catch {
			toast({
				title: "Error",
				description: "Ha ocurrido un error al crear su dispositivo",
				variant: "destructive"
			})
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='flex items-center gap-2' variant='outline'>
					<Cpu size={16} />
					Crear Dispositivos
				</Button>
			</DialogTrigger>
			<DialogContent className='min-w-max'>
				<DialogHeader>
					<DialogTitle>Crear Dispositivos</DialogTitle>
					<DialogDescription>
						Registra los dispositivos/puertas para ingresar a tu evento	
					</DialogDescription>
				</DialogHeader>
				<div className='grid grid-cols-2'>
					<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
						<Form {...form}>
							<FormField
								control={control}
								name='name'
								rules={{
									required: 'El nombre del dispositivo es obligatorio'
								}}
								render={({field})=>(
									<FormItem>
										<Label htmlFor='name'>Nombre del Dispositivo</Label>
										<Input {...field} id='name' type='text' />
										<FormMessage />
									</FormItem>
								)}
							/>
						</Form>
						<DialogFooter>
							<Button type='submit'>
								Guardar
								{
									createDeviceMutation.isLoading && <Spinner className='ml-2' />
								}
							</Button>
						</DialogFooter>
					</form>
					<div className='p-2 space-y-4 max-h-96 overflow-x-hidden overflow-y-auto'>
						{
							devices?.map(device => <DeviceCard key={device.id} device={device} />)
						}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CreateDevicesModal;