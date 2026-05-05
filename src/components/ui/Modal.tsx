import * as React from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  wide?: boolean;
}

export function Modal({ isOpen, onClose, title, children, footer, wide }: ModalProps) {
  // Close on ESC
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="backdrop"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20, x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, y: 20, x: '-50%' }}
            transition={{ duration: 0.2 }}
            className={cn('modal', wide && 'modal-wide')}
          >
            <div className="modal-header">
              <h2 className="text-lg font-semibold text-text-main">{title}</h2>
              <Button variant="ghost" size="sm" onClick={onClose} className="p-1 h-auto">
                <X className="w-5 h-5" strokeWidth={1.5} />
              </Button>
            </div>
            <div className="py-2">{children}</div>
            {footer && (
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
