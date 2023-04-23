'use client';
import Link, { LinkProps } from 'next/link';

export type NavLinkProps = LinkProps & {
  children: React.ReactNode;
  className: string;
};

export const StyledNavLink = ({
  isActive,
  className,
  ...linkProps
}: LinkProps & {
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
}) => (
  <NavLink
    className={`${
      className ?? ''
    } font-open-sans-condensed uppercase hover:text-highlight ${
      isActive ? 'text-white' : 'text-stone-400'
    }`}
    {...linkProps}
  />
);

export function NavLink(props: NavLinkProps) {
  const { children, ...linkProps } = props;

  return <Link {...linkProps}>{props.children}</Link>;
}
