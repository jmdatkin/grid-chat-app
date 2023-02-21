import InputText from "./InputText";

function EmailLoginForm(props: any) {
    return ( 
        <div className="p-24 w-full flex flex-col items-center space-y-2">
            <InputText></InputText>
            <InputText></InputText>
        </div>
    );
}

export default EmailLoginForm;