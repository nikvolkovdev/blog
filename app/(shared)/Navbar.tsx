import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './Navbar.module.scss';
import { memo } from 'react';


interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    
    const {
        className
    } = props;
    
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            {t('')}
        </div>
    );
});
