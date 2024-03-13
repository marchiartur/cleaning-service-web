import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ProviderUser } from "./domains/users/users.context";
import { IPropsProviders } from "./providers.types";

export const Providers: React.FC<IPropsProviders> = ({ children }) => {
    return (
        <AntdRegistry>
            <ProviderUser>
                {children}
            </ProviderUser>
        </AntdRegistry>
    )
}