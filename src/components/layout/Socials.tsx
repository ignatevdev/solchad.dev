import { socialLinks } from '@/config';
import { Button } from '@heroui/react';
import { cn } from '@heroui/styles';
import { GithubIcon, TwitterIcon } from 'next-share';

type SocialsProps = {
  className?: string;
};

const items = [
  {
    id: 'github',
    href: socialLinks.GITHUB,
    icon: GithubIcon,
  },
  {
    id: 'twitter',
    href: socialLinks.TWITTER,
    icon: TwitterIcon,
  },
];

export const Socials = ({ className }: SocialsProps) => {
  return (
    <div className={cn('flex justify-center gap-2', className)}>
      {items.map(({ id, href, icon: Icon }) => (
        <a key={id} href={href} target="_blank" rel="noopener noreferrer">
          <Button variant="secondary" isIconOnly size="lg">
            <Icon className="w-6! h-6!" bgStyle={{ fill: 'transparent' }} />
          </Button>
        </a>
      ))}
    </div>
  );
};
