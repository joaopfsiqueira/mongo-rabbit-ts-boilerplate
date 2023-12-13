import { model, Schema } from 'mongoose';

import { IMessage } from '../../../interfaces/repository/message-repository-interface';

const MessageSchema = new Schema(
	{
		client_id: { type: Number, required: false },
		client_user_username: { type: String, required: false },
		campaign_id: { type: Number, required: false },
		campaign_name: { type: String, required: false },
		template_id: { type: Number, required: false },
		template_name: { type: String, required: false },
		contact_id: { type: Number, required: false },
		list_id: { type: Number, required: false },
		list_name: { type: String, required: false },
		email: { type: String, required: false },
		origin: { type: String, required: false },
		origin_id: { type: Number, required: false },
		send_date: { type: Date, required: false },
		return_date: { type: Date, required: false },
		queue_date: { type: Date, required: false },
		created_at: { type: Date, required: false },
		scheduled_at: { type: Date, required: false },
		updated_at: { type: Date, required: false },
		hash: { type: String, required: false },
		status: { type: Number, required: false },
		status_name: { type: String, required: false },
		state: { type: Number, required: false },
		state_name: { type: String, required: false },
		browser: { type: String, required: false },
		platform: { type: String, required: false },
		is_desktop: { type: Boolean, required: false },
		events: { type: Array<string>, require: false },
		open: { type: Boolean, required: false },
		click: { type: Boolean, required: false },
		optout: { type: Boolean, required: false },
		uniqueEvents: { type: Array<string>, require: false },
		process_status: { type: Number, required: false },
		sub_status_name: { type: String, required: false },
		sub_status: { type: Number, required: false },
		account_id: { type: Number, required: false },
	},
	{ versionKey: false },
);

MessageSchema.index({ origin: 1, origin_id: 1 });
MessageSchema.index({ client_id: 1, scheduled_at: 1 });
MessageSchema.index({ api_campaign_id: 1 });
MessageSchema.index({ list_id: 1 });

export default model<IMessage>('Reportlogs', MessageSchema);
