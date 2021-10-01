import { useTranslation } from "react-i18next";

const Errorpage = props => {
    const { i18n } = useTranslation();

    return (
        <div className="error-page">
            <article>
                <div className="error-title">404</div>
                <div className="error-text">{i18n.t('This page could not be found.')}</div>
            </article>
        </div>
    )
}

export default Errorpage;