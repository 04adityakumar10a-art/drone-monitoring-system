function RememberMe({ checked, onChange }) {

    return (

        <label className="flex items-center gap-2 text-sm text-gray-400">

            <input

                type="checkbox"

                checked={checked}

                onChange={onChange}

                className="accent-[#D4AF37]"

            />

            Remember Me

        </label>

    );

}

export default RememberMe;