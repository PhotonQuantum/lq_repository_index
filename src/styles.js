import tw, {styled} from "twin.macro";

export const Container = tw.div`container mx-auto`
export const Title = tw.p`font-sans text-2xl text-center mt-10 mb-6 px-6`
export const Article = tw.article`prose mt-4 mx-auto px-6 md:px-0`
export const Th = styled.th(({center}) => [
    tw`whitespace-no-wrap`,
    center && tw`text-center`
])
export const Td = styled.td(({center}) => [
    tw`whitespace-no-wrap`,
    center && tw`text-center`
])
export const ScrollContainer = tw.div`overflow-x-auto`
export const Bottom = tw.div`mb-8`;
export const Input = tw.input`border-2 rounded border-solid border-gray-300 hover:border-gray-600 focus:border-gray-600 px-2 py-1 w-full`
export const Tr = styled.tr(({warn}) => [
    warn && tw`text-red-700`
])