
import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
// import Navtab from '@/components/Tab/navTab'
import Index from '../src/pages/clients/index';
// import Navtab from './../components/Tab/navTab'
import React from 'react';
import { render } from '@testing-library/react';

import {renderWithProviders} from './utils/test-utils';
describe("test case 1", () => {
   
    it("renders ", async () => {
      const data =[
            {
                "_id": "6448b2d91c8e814e84e25b11",
                "type": "State1",
                "description": "2",
                "name": "c",
                "email": "Qalmah2@Qalmah.com",
                "contactNumber": 12345,
                "address": "abc adress",
                "state": "abcstate",
                "city": "abc city",
                "zipCode": 1234,
                "timeZone": "est",
                "domainName": "domainabc",
                "databaseName": "dbname",
                "clientLogo": "log.svg",
                "accentColor": "colrred1",
                "programs": [
                    "Career services"
                ],
                "additionalFeature": [
                    "Toolkit"
                ],
                "modifiedBy": 0,
                "isDelete": false,
                "isArchive": false,
                "createdAt": "1682485977604",
                "modifiedAt": "1682485977605"
            },
            {
                "_id": "6448b2da1c8e814e84e25b13",
                "type": "State1",
                "description": "2",
                "name": "c",
                "email": "abc@abc.com",
                "contactNumber": 12345,
                "address": "abc adress",
                "state": "abcstate",
                "city": "abc city",
                "zipCode": 1234,
                "timeZone": "est",
                "domainName": "domainabc",
                "databaseName": "dbname",
                "clientLogo": "log.svg",
                "accentColor": "colrred1",
                "programs": [
                    "Career services"
                ],
                "additionalFeature": [
                    "Toolkit"
                ],
                "modifiedBy": 0,
                "isDelete": false,
                "isArchive": false,
                "createdAt": "1682485978773",
                "modifiedAt": "1682485978773"
            }
        ]
    
    
    renderWithProviders(<Index activeTanents={data} archiveData={data}/>);
        // check if all components are rendered
        expect(screen.getByText("Active")).toBeInTheDocument();
        
        expect(screen.getByText("Archived")).toBeInTheDocument();
        expect(screen.getByText("All Clients (Tenants)")).toBeInTheDocument();
        expect(screen.getByText("Add client")).toBeInTheDocument();
        // await new Promise((r) => setTimeout(r, 5000));
        // expect(screen.getByTestId)
        const menubtn =screen.getByTestId("MenuItem0")
        expect(menubtn).toBeInTheDocument()
        fireEvent.click(menubtn)
        
        expect(screen.getByText("Edit")).toBeInTheDocument();
        expect(screen.getByText("Delete")).toBeInTheDocument();
        expect(screen.getByText("Archive")).toBeInTheDocument();
        // fireEvent(
        //     getByText(container, 'Submit'),
        //     new MouseEvent('click', {
        //       bubbles: true,
        //       cancelable: true,
        //     }),
        //   )
        // expect(screen.getByTestId("MenuItem"))

        const add_button = await screen.getByText("Add client")
        fireEvent.click(add_button)
        expect(screen.getByText("Qalmah2@Qalmah.com")).toBeInTheDocument();
        
        // expect(screen.getByText("Menu")).toBeInTheDocument();
        
      });
  });


  describe("tenant Card", () => {
   
    it("renders ", async () => {
      const post = {
        "_id": "6448b2d91c8e814e84e25b11",
        "type": "State1",
        "description": "2",
        "name": "c",
        "email": "Qalmah2@Qalmah.com",
        "contactNumber": 12345,
        "address": "abc adress",
        "state": "abcstate",
        "city": "abc city",
        "zipCode": 1234,
        "timeZone": "est",
        "domainName": "domainabc",
        "databaseName": "dbname",
        "clientLogo": "log.svg",
        "accentColor": "colrred1",
        "programs": [
            "Career services"
        ],
        "additionalFeature": [
            "Toolkit"
        ],
        "modifiedBy": 0,
        "isDelete": false,
        "isArchive": false,
        "createdAt": "1682485977604",
        "modifiedAt": "1682485977605"
    }
    
    
    render(
    // <Index activeTanents={data} archiveData={data}/>
    <Cardpost data={post}isAchrivPage={false} index={0}/>
    );
        // check if all components are rendered
        expect(screen.getByText("Qalmah2@Qalmah.com")).toBeInTheDocument();
        
        // expect(screen.getByTestId)
        const menubtn =screen.getByTestId("MenuItem0")
        expect(menubtn).toBeInTheDocument()
        fireEvent.click(menubtn)
        
        expect(screen.getByText("Edit")).toBeInTheDocument();
        expect(screen.getByText("Delete")).toBeInTheDocument();
        expect(screen.getByText("Archive")).toBeInTheDocument();
        // fireEvent(
        //     getByText(container, 'Submit'),
        //     new MouseEvent('click', {
        //       bubbles: true,
        //       cancelable: true,
        //     }),
        //   )
        // expect(screen.getByTestId("MenuItem"))

        const add_button = await screen.getByText("Add client")
        fireEvent.click(add_button)
        expect(screen.getByText("Qalmah2@Qalmah.com")).toBeInTheDocument();
        
        // expect(screen.getByText("Menu")).toBeInTheDocument();
        
      });
  });