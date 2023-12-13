import { Document } from 'mongoose';

export interface IMessage extends Document {
	client_id: number;
	client_user_username: string;
	campaign_id: number;
	campaign_name: string;
	template_id: number;
	template_name: string;
	contact_id: number;
	list_id: number;
	list_name: string;
	email: string;
	origin: string;
	origin_id: number;
	send_date: Date;
	return_date: Date;
	queue_date: Date;
	created_date: Date;
	schedule_date: Date;
	updated_date: Date;
	hash: string;
	status: number;
	status_name: string;
	state: number;
	state_name: string;
	browser: string;
	platform: string;
	is_desktop: boolean;
	events: Array<String>;
	open: boolean;
	click: boolean;
	optout: boolean;
	uniqueEvents: Array<String>;
	process_status: Array<String>;
	sub_status_name: string;
	sub_status: number;
	account_id: number;
}
