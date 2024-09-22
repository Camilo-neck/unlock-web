import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Microchip } from 'lucide-react';
import { Device } from '@/schemas/device.schema';
import { formatDateString } from '@/lib/utils';

interface DeviceCardProps {
	device: Device;
}

const DeviceCard = ({
	device
}: DeviceCardProps) => {
	return (
		<Card className='w-max'>
			<CardHeader>
				<CardTitle className='flex gap-2 items-center'>
					<Microchip />
					{device.name}
				</CardTitle>
				<CardDescription className='min-w-max'>
					{device.status} | {formatDateString(device.created_at)}
				</CardDescription>
			</CardHeader>
		</Card>
	);
};

export default DeviceCard;