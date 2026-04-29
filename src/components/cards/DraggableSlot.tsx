import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { InventorySlot } from './InventorySlot';

export function DraggableSlot(props: React.ComponentProps<typeof InventorySlot> & { isVisuallyDragging?: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `slot-${props.position}`,
    data: {
      type: 'slot',
      position: props.position,
      item: props.item,
    },
    disabled: !props.item || !props.unlocked, // Only draggable if there's an item
  });

  return (
    <InventorySlot 
      {...props} 
      dragAttributes={attributes}
      dragListeners={listeners}
      setDragRef={setNodeRef}
      isDragging={isDragging}
    />
  );
}
