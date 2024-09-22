import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle, DialogTrigger, DialogContent, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateEventSchema } from "@/schemas/event.schema";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "react-query";
import createEvent from "@/services/mutations/createEvent.service";
import { useToast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import useAdminEvents from "@/stores/useAdminEvents";
import { Spinner } from "@/components/ui/spinner";

const CreateEventModal = () => {
	const form = useForm<z.infer<typeof CreateEventSchema>>({
		resolver: zodResolver(CreateEventSchema),
	});
	const { control, handleSubmit, watch, reset } = form;
	const { toast } = useToast();
	const { appendEvent } = useAdminEvents();
	const [ open, setOpen ] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	const createEventMutation = useMutation({
		mutationKey: ['createEvent'],
		mutationFn: createEvent,
	})
	
	const onSubmit = async (data: z.infer<typeof CreateEventSchema>) => {
		try {
			const newEvents = await createEventMutation.mutateAsync(data);
			appendEvent(newEvents);
			setOpen(false);
			reset();
			toast({
				title: 'Evento creado',
				description: 'Tu evento ha sido creado exitosamente',
			})
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Ha ocurrido un error al crear el evento',
				variant: 'destructive',
			})
		}
	}

	return (
		<Dialog open={open} onOpenChange={(open)=>setOpen(open)} >
			<DialogTrigger asChild>
				<Button className='flex items-center gap-2' variant='outline'>
					<Plus size={16} />
                  	Crear Evento
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Crear Evento</DialogTitle>
					<DialogDescription>
						Crea tu evento y comienza a administrar tus invitados
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form ref={formRef} className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
						<FormField
							control={control}
							name="name"
							render={({ field }) => (
								<div className='flex flex-col gap-2'>
									<Label htmlFor='name'>Nombre</Label>
									<Input {...field} id='name' />
									<FormMessage />
								</div>
							)}
						/>
						<FormField
							control={control}
							name="description"
							render={({ field }) => (
								<div className='flex flex-col gap-2'>
									<Label htmlFor='description'>Descripción</Label>
									<Textarea {...field} id='description' />
									<FormMessage />
								</div>
							)}
						/>
						<FormField
							control={control}
							name="location"
							render={({ field }) => (
								<div className='flex flex-col gap-2'>
									<Label htmlFor='location'>Ubicación</Label>
									<Input {...field} id='location' />
									<FormMessage />
								</div>
							)}
						/>
						<FormField
							control={control}
							name="capacity"
							render={({ field }) => (
								<div className='flex flex-col gap-2'>
									<Label htmlFor='capacity'>Capacidad</Label>
									<Input type='number'{...field} onChange={(e)=> field.onChange(Number.parseInt(e.target.value))}  id='capacity' />
									<FormMessage />
								</div>
							)}
						/>
						<FormField
							control={control}
							name="start_time"
							render={({ field }) => (
								<div className='flex flex-col gap-2'>
									<Label htmlFor='start_time'>Hora de inicio</Label>
									<Input type='datetime-local' min={new Date().toISOString().substring(0, 16)} {...field} id='start_time' />
									<FormMessage />
								</div>
							)}
						/>
						<FormField
							control={control}
							name="end_time"
							render={({ field }) => (
								<div className='flex flex-col gap-2'>
									<Label htmlFor='end_time'>Hora de finalización</Label>
									<Input type='datetime-local' min={watch('start_time')} {...field} id='end_time' />
									<FormMessage />
								</div>
							)}
						/>
					</form>
				</Form>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Cancelar</Button>
					</DialogClose>
					<Button onClick={()=>formRef.current?.requestSubmit()}>
						Crear
						{
							createEventMutation.isLoading && <Spinner className='ml-2' />
						}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreateEventModal;