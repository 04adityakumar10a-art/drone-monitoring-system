function AnalyticsChartCard({
    title,
    subtitle,
    value,
    icon,
    children,
    footer
}) {

    return (

        <div className="group overflow-hidden rounded-3xl border border-[#232323] bg-[#101010] transition-all duration-300 hover:border-[#D4AF37]/30 hover:shadow-[0_0_40px_rgba(212,175,55,0.08)]">

            <div className="border-b border-[#232323] p-6">

                <div className="flex items-start justify-between">

                    <div>

                        <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]">

                            {title}

                        </p>

                        <h2 className="mt-3 text-4xl font-black text-white">

                            {value}

                        </h2>

                        <p className="mt-2 text-sm text-gray-400">

                            {subtitle}

                        </p>

                    </div>

                    <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#171717] p-4 text-[#D4AF37]">

                        {icon}

                    </div>

                </div>

            </div>

            <div className="p-6">

                {children}

            </div>

            {footer && (

                <div className="border-t border-[#232323] bg-[#0D0D0D] px-6 py-4">

                    {footer}

                </div>

            )}

        </div>

    );

}

export default AnalyticsChartCard;