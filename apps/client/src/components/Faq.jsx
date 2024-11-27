import { Flex } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

const FaqBody = () => {
    const [t] = useTranslation("global");

    return (
        <Flex vertical="true">
            <h1>{t('faq.title')}</h1>
            
            <h2>{t('faq.eligibility.title')}</h2>
            <h3>{t('faq.eligibility.description')}</h3>
            
            <h2>{t('faq.reservation.title')}</h2>
            <h3>{t('faq.reservation.description')}</h3>
            
            <h2>{t('faq.rates.title')}</h2>
            <h3>{t('faq.rates.description')}</h3>
            
            <h2>{t('faq.usage.title')}</h2>
            <h3>{t('faq.usage.description')}</h3>
            
            <h2>{t('faq.insurance.title')}</h2>
            <h3>{t('faq.insurance.description')}</h3>
            
            <h2>{t('faq.return.title')}</h2>
            <h3>{t('faq.return.description')}</h3>
            
            <h2>{t('faq.cancellation.title')}</h2>
            <h3>{t('faq.cancellation.description')}</h3>
            
            <h2>{t('faq.liability.title')}</h2>
            <h3>{t('faq.liability.description')}</h3>
            
            <h2>{t('faq.modifications.title')}</h2>
            <h3>{t('faq.modifications.description')}</h3>
            
            <h2>{t('faq.jurisdiction.title')}</h2>
            <h3>{t('faq.jurisdiction.description')}</h3>
        </Flex>
    );
};

export default FaqBody;
