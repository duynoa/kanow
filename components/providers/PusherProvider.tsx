'use client';

import Pusher from 'pusher-js';
import { useEffect } from 'react';

interface PusherProviderProps {
  generalKey: {
    pusher?: string;
    cluster?: string;
  } | null;
  informationUser: {
    id?: string | number;
  } | null;
  onStatusChange: (status: { status: number; statusCustom: number; note?: string }) => void;
  onNotification: (data: {
    id: number;
    object_id: string;
    object_type: string;
    title: string;
    content: string;
    created_at: string;
    json_data: string;
  }) => void;
}

export default function PusherProvider({
  generalKey,
  informationUser,
  onStatusChange,
  onNotification,
}: PusherProviderProps) {
  useEffect(() => {
    if (!generalKey?.pusher || !generalKey?.cluster || !informationUser?.id) return;

    const pusher = new Pusher(generalKey.pusher, {
      authTransport: 'ajax',
      cluster: generalKey.cluster,
    });

    pusher.connection.bind('connected', () => {
      console.log('Pusher connected');
    });

    pusher.connection.bind('error', (err: Error) => {
      console.error('Pusher error:', err);
    });

    const channelName = `notifications-channel-${informationUser.id}-customer`;
    const presenceChannel = pusher.subscribe(channelName);

    presenceChannel.bind('notification', (data: Parameters<typeof onNotification>[0]) => {
      console.log('Pusher notification:', data);
      if (data) onNotification(data);
    });

    presenceChannel.bind('change-status', (data: { status: number; note_status?: string }) => {
      console.log('Pusher change-status:', data);
      if (data) {
        onStatusChange({
          status: +data.status,
          statusCustom: +data.status,
          note: data.note_status,
        });
      }
    });

    return () => {
      presenceChannel.unbind('notification');
      presenceChannel.unbind('change-status');
      pusher.unsubscribe(channelName);
      pusher.disconnect();
    };
  }, [generalKey, informationUser?.id]);

  return null;
}
